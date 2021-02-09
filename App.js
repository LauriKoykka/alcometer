import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';


export default function App() {
  const [weight, setWeight] = useState();
  const [bottles, setBottles] = useState(0);
  const [time, setTime] = useState(0);
  const [gender, setGender] = useState(0);
  const [promilles, setPromilles] = useState(0);

  var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
  ];

  function calculate() {
    var litres = bottles * 0.33;
    var grams = litres * 8 * 4.5;
    var burning = weight / 10;
    var gramsLeft = grams - burning * time;
    var resultMale = gramsLeft / (weight * 0.7);
    var resultFemale = gramsLeft / (weight * 0.6);

    if (gender === 0) {
      if (resultMale < 0) {
        resultMale = 0;
      }
      setPromilles(resultMale);
    } else {
      if (resultFemale < 0) {
        resultFemale = 0;
      }
      setPromilles(resultFemale);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text>Weight</Text>
        <TextInput style={styles.input} keyboardType="number-pad" placeholder="Enter Weight" value={weight} onChangeText={text => setWeight(text)}></TextInput>
        <Text>Bottles</Text>
      </View>
      <DropDownPicker
        items={[
          {label: '1 bottle', value: 1},
          {label: '2 bottles', value: 2},
          {label: '3 bottles', value: 3},
          {label: '4 bottles', value: 4},
          {label: '5 bottles', value: 5}
        ]}
        containerStyle={styles.dropdown}
        itemStyle={styles.dropdowntext}
        labelStyle={{color:"#000"}}
        onChangeItem={item => setBottles(item.value)}
      />
      <Text style={styles.field}>Time</Text>
      <DropDownPicker
        items={[
          {label: '1 hour', value: 1},
          {label: '2 hours', value: 2},
          {label: '3 hours', value: 3},
          {label: '4 hours', value: 4},
          {label: '5 hours', value: 5}
        ]}
        containerStyle={styles.dropdown}
        itemStyle={styles.dropdowntext}
        labelStyle={{color:"#000"}}
        onChangeItem={item => setTime(item.value)}
      />
      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm radio_props={radio_props} onPress={(value) => setGender(value)} />
        <Text>Promilles</Text>
        <Text>{parseFloat(promilles).toFixed(2)}</Text>
        <Button onPress={calculate} title="Calculate"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
  dropdowntext: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  dropdown: {
    marginLeft: 10,
    height: 40,
    width: 140,
  },
  field: {
    margin: 10,
  }
});
