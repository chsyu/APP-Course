import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDiaryDate, sortDiariesByEntryDateDesc } from '../utils/dateFormatter';
import { useUserStore } from './useUserStore';
import {
  syncDiaryUpsert,
  syncDiaryDelete,
  DEFAULT_JOURNAL_ID,
} from '../services/diarySyncService';
import {
  createSharedJournal as createSharedJournalRemote,
  updateSharedJournalMeta,
  syncSharedJournalMemberRefs,
  deleteSharedJournalMemberRef,
} from '../services/sharedJournalService';
import { getPublicProfileByEmail, normalizeAuthEmail } from '../services/userService';

/** @param {{ updatedAtMs?: number } | undefined} d */
function diaryUpdatedMs(d) {
  return typeof d?.updatedAtMs === 'number' ? d.updatedAtMs : 0;
}

function defaultJournals() {
  return [{ id: DEFAULT_JOURNAL_ID, name: '私人日記', sortOrder: 0, kind: 'private' }];
}

function sortJournals(list) {
  return [...list].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function normalizeJournal(j) {
  if (!j || typeof j !== 'object') return j;
  if (j.kind === 'shared') return j;
  return { ...j, kind: j.kind ?? 'private' };
}

/** 目前使用中日记本內的條目（依日期新到舊） */
export function selectActiveDiaries(state) {
  return sortDiariesByEntryDateDesc(
    state.diaries.filter(
      (d) => (d.journalId ?? DEFAULT_JOURNAL_ID) === state.activeJournalId
    )
  );
}

const initialDiariesRaw = [
  {
    id: '1',
    title: '美好的早晨',
    content: '<p>今天早上起床時，陽光透過窗戶灑進來，感覺特別美好。決定去公園散步，呼吸新鮮空氣。</p>',
    date: '2024年01月15日 08:30',
    lastModifiedTimestamp: '2024-01-15T08:30:00.000Z',
    latitude: 25.0330,
    longitude: 121.5654,
  },
  {
    id: '2',
    title: '學習 React Native',
    content: '<p>今天開始學習 React Native，感覺很有趣。學會了如何使用 FlatList 來顯示列表資料。</p>',
    date: '2024年01月14日 14:20',
    lastModifiedTimestamp: null,
    latitude: 25.0330,
    longitude: 121.5654,
  },
  {
    id: '3',
    title: '和朋友聚餐',
    content: '<p>晚上和朋友一起去吃火鍋，聊了很多有趣的話題。好久沒有這麼開心了！</p>',
    date: '2024年01月13日 19:00',
    lastModifiedTimestamp: null,
    latitude: 25.0420,
    longitude: 121.5645,
  },
  {
    id: '4',
    title: '週末閱讀時光',
    content: '<p>週末在家讀了一本好書，內容關於時間管理。學到了很多實用的技巧，準備開始實踐。</p>',
    date: '2024年01月12日 15:45',
    lastModifiedTimestamp: null,
    latitude: 25.0330,
    longitude: 121.5654,
  },
  {
    id: '5',
    title: '運動日記',
    content: '<p>今天去健身房運動了一個小時，雖然很累但感覺身體變得更健康了。要堅持下去！</p>',
    date: '2024年01月11日 18:00',
    lastModifiedTimestamp: null,
    latitude: 25.0500,
    longitude: 121.5500,
  },
  {
    id: '6',
    title: '工作上的突破',
    content: '<p>今天完成了一個重要的專案，得到了主管的肯定。感覺自己的努力沒有白費，很開心。</p>',
    date: '2024年01月10日 17:30',
    lastModifiedTimestamp: null,
    latitude: 25.0330,
    longitude: 121.5654,
  },
  {
    id: '7',
    title: '咖啡時光',
    content: '<p>下午去了一家新開的咖啡店，環境很舒適，咖啡也很好喝。適合一個人靜靜地思考。</p>',
    date: '2024年01月09日 16:15',
    lastModifiedTimestamp: null,
    latitude: 25.0420,
    longitude: 121.5645,
  },
  {
    id: '8',
    title: '學習新技能',
    content: '<p>開始學習攝影，今天練習了構圖技巧。雖然還不熟練，但已經能拍出一些不錯的照片了。</p>',
    date: '2024年01月08日 10:00',
    lastModifiedTimestamp: null,
    latitude: 25.0200,
    longitude: 121.5700,
  },
  {
    id: '9',
    title: '雨天的心情',
    content: '<p>今天下了一整天的雨，雖然不能出門，但在家裡聽音樂、看電影也很愜意。</p>',
    date: '2024年01月07日 14:20',
    lastModifiedTimestamp: null,
    latitude: 25.0330,
    longitude: 121.5654,
  },
  {
    id: '10',
    title: '美食探索',
    content: '<p>嘗試了一家新的餐廳，點了招牌菜。味道很不錯，下次還要再來試試其他菜色。</p>',
    date: '2024年01月06日 19:30',
    lastModifiedTimestamp: null,
    latitude: 25.0420,
    longitude: 121.5645,
  },
  {
    id: '11',
    title: '早起的習慣',
    content: '<p>今天嘗試早起，六點就起床了。感覺一天的時間變長了，可以做更多事情。</p>',
    date: '2024年01月05日 06:00',
    lastModifiedTimestamp: null,
    latitude: 25.0330,
    longitude: 121.5654,
  },
  {
    id: '12',
    title: '音樂會回憶',
    content: '<p>晚上去聽了場音樂會，演奏的曲目都很經典。現場的氛圍很棒，讓人完全沉浸在音樂中。</p>',
    date: '2024年01月04日 20:00',
    lastModifiedTimestamp: null,
    latitude: 25.0500,
    longitude: 121.5500,
  },
  {
    id: '13',
    title: '整理房間',
    content: '<p>花了一整個下午整理房間，丟掉了很多不需要的東西。房間變整齊了，心情也跟著變好。</p>',
    date: '2024年01月03日 13:45',
    lastModifiedTimestamp: null,
    latitude: 25.0330,
    longitude: 121.5654,
  },
  {
    id: '14',
    title: '看電影',
    content: '<p>和朋友一起去看了一部新上映的電影，劇情很精彩，特效也很震撼。討論了很久才回家。</p>',
    date: '2024年01月02日 21:15',
    lastModifiedTimestamp: null,
    latitude: 25.0420,
    longitude: 121.5645,
  },
  {
    id: '15',
    title: '新的開始',
    content: '<p>今天是新的一年的開始，對未來充滿了期待。希望今年能夠達成自己的目標。</p>',
    date: '2024年01月01日 00:00',
    lastModifiedTimestamp: null,
    latitude: 25.0330,
    longitude: 121.5654,
  },
];

const initialDiaries = sortDiariesByEntryDateDesc(
  initialDiariesRaw.map((d) => ({ ...d, journalId: DEFAULT_JOURNAL_ID }))
);

async function buildMemberSummaries(memberEmails, previousSummaries) {
  const prevMap = new Map(
    (previousSummaries || []).map((s) => [
      normalizeAuthEmail(s.email || s.uid || ''),
      s,
    ]).filter(([k]) => k)
  );
  const list = await Promise.all(
    (memberEmails || []).map(async (raw) => {
      const em = normalizeAuthEmail(raw);
      const prev = prevMap.get(em);
      const p = await getPublicProfileByEmail(em);
      return {
        email: em,
        userName: (p?.userName ?? prev?.userName ?? '').trim(),
        avatar: p?.avatar !== undefined ? p.avatar : (prev?.avatar ?? null),
      };
    })
  );
  return list;
}

const useDiaryStore = create(
  persist(
    (set, get) => ({
      diaries: initialDiaries,
      journals: defaultJournals(),
      activeJournalId: DEFAULT_JOURNAL_ID,
      journalSheetOpen: false,

      openJournalSheet: () => set({ journalSheetOpen: true }),
      closeJournalSheet: () => set({ journalSheetOpen: false }),

      setActiveJournal: (journalId) => {
        const { journals } = get();
        if (!journals.some((j) => j.id === journalId)) return;
        set({ activeJournalId: journalId });
      },

      getJournalById: (journalId) => {
        const j = get().journals.find((x) => x.id === journalId);
        return j ? normalizeJournal(j) : null;
      },

      /** 私人日誌：僅本地 id，不切換 activeJournalId */
      createPrivateJournal: (name) => {
        const trimmed = (name || '').trim() || '新日誌';
        const id = `journal_${Date.now()}`;
        set((state) => {
          const maxOrder = state.journals.reduce((m, j) => Math.max(m, j.sortOrder ?? 0), -1);
          const next = [
            ...state.journals,
            { id, name: trimmed, sortOrder: maxOrder + 1, kind: 'private' },
          ];
          return { journals: sortJournals(next) };
        });
        return id;
      },

      /**
       * @returns {Promise<{ success: true, journalId: string } | { success: false, error: string }>}
       */
      createSharedJournal: async (name, extraMemberEmails) => {
        const uid = useUserStore.getState().user?.uid;
        const myEmail = normalizeAuthEmail(useUserStore.getState().user?.email);
        if (!uid) {
          return { success: false, error: '請先登入以建立分享日誌' };
        }
        if (!myEmail) {
          return { success: false, error: '分享日誌需使用 Email 帳號（匿名／手機登入不適用）' };
        }
        const others = (extraMemberEmails || [])
          .map((x) => normalizeAuthEmail(x))
          .filter((e) => e && e !== myEmail);
        const memberEmails = Array.from(new Set([myEmail, ...others]));
        const trimmedName = (name || '').trim() || '分享日誌';
        const res = await createSharedJournalRemote({
          name: trimmedName,
          ownerUid: uid,
          memberEmails,
        });
        if (!res.success) return { success: false, error: res.error || '建立失敗' };

        const journalId = res.journalId;
        const memberSummaries = await buildMemberSummaries(memberEmails, null);

        set((state) => {
          const maxOrder = state.journals.reduce((m, j) => Math.max(m, j.sortOrder ?? 0), -1);
          const next = [
            ...state.journals,
            {
              id: journalId,
              name: trimmedName,
              sortOrder: maxOrder + 1,
              kind: 'shared',
              ownerUid: uid,
              memberEmails,
              memberSummaries,
            },
          ];
          return { journals: sortJournals(next) };
        });
        return { success: true, journalId };
      },

      renameJournal: (journalId, name) => {
        const trimmed = (name || '').trim() || '新日誌';
        const j = get().journals.find((x) => x.id === journalId);
        if (!j) return;
        const uid = useUserStore.getState().user?.uid;
        if (normalizeJournal(j).kind === 'shared' && j.ownerUid === uid) {
          updateSharedJournalMeta(journalId, { name: trimmed }).catch((e) =>
            console.warn('[shared journal] rename remote failed', e)
          );
        }
        set((state) => ({
          journals: sortJournals(
            state.journals.map((x) => (x.id === journalId ? { ...x, name: trimmed } : x))
          ),
        }));
      },

      /**
       * @returns {Promise<{ success: true } | { success: false, error: string }>}
       */
      updateSharedJournalMembers: async (journalId, memberEmailsInput) => {
        const uid = useUserStore.getState().user?.uid;
        const myEmail = normalizeAuthEmail(useUserStore.getState().user?.email);
        const j = get().journals.find((x) => x.id === journalId);
        if (!j || normalizeJournal(j).kind !== 'shared') {
          return { success: false, error: '不是分享日誌' };
        }
        if (j.ownerUid !== uid) {
          return { success: false, error: '僅擁有者可編輯成員' };
        }
        if (!myEmail) {
          return { success: false, error: '需要 Email 帳號' };
        }
        const unique = Array.from(
          new Set((memberEmailsInput || []).map((e) => normalizeAuthEmail(e)).filter(Boolean))
        );
        if (!unique.includes(myEmail)) unique.unshift(myEmail);
        const res = await updateSharedJournalMeta(journalId, { memberEmails: unique });
        if (!res.success) return { success: false, error: res.error || '更新失敗' };

        const previousKeys = (j.memberEmails || [])
          .map((e) => normalizeAuthEmail(e))
          .filter(Boolean);
        const nextSet = new Set(unique);
        for (const em of previousKeys) {
          if (!nextSet.has(em)) {
            await deleteSharedJournalMemberRef(journalId, em);
          }
        }
        await syncSharedJournalMemberRefs(journalId, unique);

        const prev = j.memberSummaries;
        const memberSummaries = await buildMemberSummaries(unique, prev);
        set((state) => ({
          journals: sortJournals(
            state.journals.map((x) =>
              x.id === journalId
                ? { ...x, memberEmails: unique, memberSummaries }
                : x
            )
          ),
        }));
        return { success: true };
      },

      refreshJournalMemberSummaries: async (journalId) => {
        const j = get().journals.find((x) => x.id === journalId);
        if (!j || normalizeJournal(j).kind !== 'shared' || !j.memberEmails?.length) return;
        const memberSummaries = await buildMemberSummaries(j.memberEmails, j.memberSummaries);
        set((state) => ({
          journals: state.journals.map((x) =>
            x.id === journalId ? { ...x, memberSummaries } : x
          ),
        }));
      },

      /**
       * @param {{ privateDiaries: object[] | null, sharedClusters: { id: string, name: string, ownerUid: string, memberEmails: string[], diaries: object[] }[] | null }} payload
       */
      mergeRemoteSync: ({ privateDiaries, sharedClusters }) => {
        set((state) => {
          const byId = new Map(state.diaries.map((d) => [d.id, { ...d }]));
          let journals = sortJournals(state.journals.map((j) => normalizeJournal(j)));
          let journalIdSet = new Set(journals.map((j) => j.id));

          if (sharedClusters !== null) {
            const fetchedSharedIds = new Set(sharedClusters.map((c) => c.id));

            journals = journals.filter(
              (j) => normalizeJournal(j).kind !== 'shared' || fetchedSharedIds.has(j.id)
            );

            for (const c of sharedClusters) {
              const existing = state.journals.find((j) => j.id === c.id);
              const maxOrder = journals.reduce((m, j) => Math.max(m, j.sortOrder ?? 0), -1);
              const sortOrder = existing ? existing.sortOrder : maxOrder + 1;
              const preserved =
                existing?.kind === 'shared' ? existing.memberSummaries : undefined;
              const emails = (c.memberEmails || []).map((e) => normalizeAuthEmail(e)).filter(Boolean);
              const memberSummaries = emails.map((em) => {
                const prev = preserved?.find(
                  (s) => normalizeAuthEmail(s.email || s.uid || '') === em
                );
                return {
                  email: em,
                  userName: prev?.userName ?? '',
                  avatar: prev?.avatar ?? null,
                };
              });
              journals = journals.filter((j) => j.id !== c.id);
              journals.push({
                id: c.id,
                name: c.name || '分享日誌',
                sortOrder,
                kind: 'shared',
                ownerUid: c.ownerUid || '',
                memberEmails: emails,
                memberSummaries,
              });
            }

            journalIdSet = new Set(journals.map((j) => j.id));

            for (const [id, d] of [...byId.entries()]) {
              const jid = d.journalId ?? DEFAULT_JOURNAL_ID;
              const jMeta = journals.find((x) => x.id === jid);
              if (
                jMeta &&
                normalizeJournal(jMeta).kind === 'shared' &&
                !fetchedSharedIds.has(jid)
              ) {
                byId.delete(id);
              }
            }

            for (const c of sharedClusters) {
              for (const r of c.diaries || []) {
                const cur = byId.get(r.id);
                const remoteMs = diaryUpdatedMs(r);
                const jid = c.id;
                if (!cur || remoteMs > diaryUpdatedMs(cur)) {
                  const cbe = normalizeAuthEmail(r.createdByEmail);
                  const lbe = normalizeAuthEmail(r.lastEditedByEmail);
                  byId.set(r.id, {
                    id: r.id,
                    title: r.title,
                    content: r.content,
                    date: r.date,
                    modifiedDate: r.modifiedDate ?? null,
                    updatedAtMs: remoteMs,
                    journalId: jid,
                    ...(cbe ? { createdByEmail: cbe } : {}),
                    ...(lbe ? { lastEditedByEmail: lbe } : {}),
                    ...(r.latitude != null && r.longitude != null
                      ? { latitude: r.latitude, longitude: r.longitude }
                      : {}),
                  });
                }
              }
            }
          }

          if (privateDiaries !== null) {
            for (const r of privateDiaries) {
              const jid =
                r.journalId != null && String(r.journalId) !== ''
                  ? String(r.journalId)
                  : DEFAULT_JOURNAL_ID;
              if (!journalIdSet.has(jid)) {
                const looksLikeFirestoreId = /^[a-zA-Z0-9]{20}$/.test(jid);
                const label =
                  jid === DEFAULT_JOURNAL_ID
                    ? '私人日記'
                    : looksLikeFirestoreId
                      ? `分享日誌 (${jid.slice(-6)})`
                      : `日記本 (${jid.slice(-6)})`;
                const maxOrder = journals.reduce((m, j) => Math.max(m, j.sortOrder ?? 0), -1);
                journals.push({
                  id: jid,
                  name: label,
                  sortOrder: maxOrder + 1,
                  kind: 'private',
                });
                journalIdSet.add(jid);
              }
            }

            for (const r of privateDiaries) {
              const cur = byId.get(r.id);
              const remoteMs = diaryUpdatedMs(r);
              const jid =
                r.journalId != null && String(r.journalId) !== ''
                  ? String(r.journalId)
                  : DEFAULT_JOURNAL_ID;
              if (!cur || remoteMs > diaryUpdatedMs(cur)) {
                const cbe = normalizeAuthEmail(r.createdByEmail);
                const lbe = normalizeAuthEmail(r.lastEditedByEmail);
                byId.set(r.id, {
                  id: r.id,
                  title: r.title,
                  content: r.content,
                  date: r.date,
                  modifiedDate: r.modifiedDate ?? null,
                  updatedAtMs: remoteMs,
                  journalId: jid,
                  ...(cbe ? { createdByEmail: cbe } : {}),
                  ...(lbe ? { lastEditedByEmail: lbe } : {}),
                  ...(r.latitude != null && r.longitude != null
                    ? { latitude: r.latitude, longitude: r.longitude }
                    : {}),
                });
              }
            }
          }

          const merged = sortDiariesByEntryDateDesc(
            Array.from(byId.values()).map((d) => ({
              ...d,
              journalId: d.journalId ?? DEFAULT_JOURNAL_ID,
            }))
          );
          let activeJournalId = state.activeJournalId;
          if (!journals.some((j) => j.id === activeJournalId)) {
            activeJournalId = DEFAULT_JOURNAL_ID;
          }
          return { diaries: merged, journals: sortJournals(journals), activeJournalId };
        });
      },

      mergeRemoteDiaries: (remoteList) => {
        get().mergeRemoteSync({ privateDiaries: remoteList, sharedClusters: null });
      },

      updateDiary: (id, title, content) => {
        let nextDiary = null;
        const myEmail = normalizeAuthEmail(useUserStore.getState().user?.email);
        const stateBefore = get();
        const target = stateBefore.diaries.find((d) => d.id === id);
        if (target) {
          const jMeta = stateBefore.journals.find((j) => j.id === target.journalId);
          if (normalizeJournal(jMeta).kind === 'shared') {
            const author = normalizeAuthEmail(target.createdByEmail);
            if (!myEmail || !author || author !== myEmail) {
              Alert.alert('無法編輯', '僅作者可修改分享日誌中的此篇日記。');
              return;
            }
          }
        }
        set((state) => ({
          diaries: state.diaries.map((diary) => {
            if (diary.id !== id) return diary;
            const jMeta = state.journals.find((j) => j.id === diary.journalId);
            const isShared = normalizeJournal(jMeta).kind === 'shared';
            nextDiary = {
              ...diary,
              title,
              content,
              modifiedDate: formatDiaryDate(),
              updatedAtMs: Date.now(),
              ...(isShared && myEmail ? { lastEditedByEmail: myEmail } : {}),
            };
            return nextDiary;
          }),
        }));
        const uid = useUserStore.getState().user?.uid;
        const journal = nextDiary ? get().getJournalById(nextDiary.journalId) : null;
        if (uid && nextDiary && journal) {
          syncDiaryUpsert(uid, nextDiary, journal).catch((e) =>
            console.warn('[diary sync] upsert after update failed', e)
          );
        }
      },

      createDiary: async (title = '新日記', content = '') => {
        const newId = String(Date.now());
        const now = Date.now();
        const { activeJournalId } = get();
        const journal = get().getJournalById(activeJournalId);
        const myEmail = normalizeAuthEmail(useUserStore.getState().user?.email);
        const isShared = journal && normalizeJournal(journal).kind === 'shared';
        const newDiary = {
          id: newId,
          title,
          content: content || '<p></p>',
          date: formatDiaryDate(),
          modifiedDate: null,
          updatedAtMs: now,
          journalId: activeJournalId,
          ...(isShared && myEmail
            ? { createdByEmail: myEmail, lastEditedByEmail: myEmail }
            : {}),
        };
        set((state) => ({
          diaries: sortDiariesByEntryDateDesc([newDiary, ...state.diaries]),
        }));
        const uid = useUserStore.getState().user?.uid;
        if (uid && journal) {
          syncDiaryUpsert(uid, newDiary, journal).catch((e) =>
            console.warn('[diary sync] upsert after create failed', e)
          );
        }
        return newDiary;
      },

      deleteDiary: (id) => {
        const diary = get().diaries.find((d) => d.id === id);
        const journal = diary ? get().getJournalById(diary.journalId) : null;
        const myEmail = normalizeAuthEmail(useUserStore.getState().user?.email);
        if (journal && normalizeJournal(journal).kind === 'shared') {
          const author = normalizeAuthEmail(diary?.createdByEmail);
          if (!myEmail || !author || author !== myEmail) {
            Alert.alert('無法刪除', '僅作者可刪除分享日誌中的此篇日記。');
            return;
          }
        }
        const uid = useUserStore.getState().user?.uid;
        if (uid && diary && journal) {
          syncDiaryDelete(uid, diary, journal).catch((e) =>
            console.warn('[diary sync] delete remote failed', e)
          );
        }
        set((state) => ({
          diaries: state.diaries.filter((d) => d.id !== id),
        }));
      },

      getDiaryById: (id) => {
        const state = get();
        return state.diaries.find((diary) => diary.id === id) || null;
      },
    }),
    {
      name: 'diary-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        diaries: state.diaries,
        journals: state.journals,
        activeJournalId: state.activeJournalId,
      }),
      merge: (persistedState, currentState) => {
        const p = persistedState && typeof persistedState === 'object' ? persistedState : {};
        const merged = { ...currentState };

        function mapJournalFromStorage(j) {
          const n = normalizeJournal(j);
          if (n.kind !== 'shared') return n;
          const { memberUids: _legacyUids, ...rest } = n;
          return {
            ...rest,
            memberEmails: Array.isArray(rest.memberEmails)
              ? rest.memberEmails.map((e) => normalizeAuthEmail(e)).filter(Boolean)
              : [],
          };
        }

        if (Array.isArray(p.diaries)) {
          merged.diaries = sortDiariesByEntryDateDesc(
            p.diaries.map((d) => ({ ...d, journalId: d.journalId ?? DEFAULT_JOURNAL_ID }))
          );
        }

        if (Array.isArray(p.journals) && p.journals.length > 0) {
          merged.journals = sortJournals(p.journals.map(mapJournalFromStorage));
        } else if (Array.isArray(currentState.journals) && currentState.journals.length > 0) {
          // 新裝置尚無本地 journals 時，persist 還原不可覆蓋已在記憶體中由 mergeRemoteSync 寫入的分享日誌
          merged.journals = sortJournals(currentState.journals.map(mapJournalFromStorage));
        } else {
          merged.journals = defaultJournals();
        }

        let activeJournalId =
          typeof p.activeJournalId === 'string' ? p.activeJournalId : DEFAULT_JOURNAL_ID;
        if (!merged.journals.some((j) => j.id === activeJournalId)) {
          activeJournalId = DEFAULT_JOURNAL_ID;
        }
        merged.activeJournalId = activeJournalId;
        merged.journalSheetOpen = false;
        return merged;
      },
    }
  )
);

export default useDiaryStore;
