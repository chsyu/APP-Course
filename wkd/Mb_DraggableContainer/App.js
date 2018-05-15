import React from 'react';
import { ScrollView, View } from 'react-native';

import Panel from './components/Panel';

const App = () => (
  <ScrollView 
    style={{ marginTop: 40, backgroundColor: 'lightgray' }}
  >
    <Panel
      title='First container'
      expanded='false'
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the"
    />
    <Panel
      title='Second container'
      expanded='false'
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the"
    />
    <Panel
      title='Third container'
      expanded='false'
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the"
    />
    <Panel
      title='Forth container'
      expanded='false'
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the"
    />
    <Panel
      title='Fifth container'
      expanded='false'
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the"
    />
    <View />
  </ScrollView>
);

export default App;
