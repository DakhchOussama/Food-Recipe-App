import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator {...props}></ActivityIndicator>
    </View>
  )
}