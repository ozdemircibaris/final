import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Modal, Dimensions, Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { RFValue } from 'react-native-responsive-fontsize';
import { Actions } from 'react-native-router-flux';
import LottieView from 'lottie-react-native';

const testItem = [
  {
    id: "1",//C
    title: "Style ne işe yarar?",
    a: "State yönetimi",
    b: "Props yönetimi",
    c: "Uygulama içi tasarım yönetimi",
    d: "Uygulamaya start verir",
    monCoin: false,
  },
  {
    id: "2",//D
    title: "Component içinde hangisi kullanılmaz?",
    a: "View",
    b: "Button",
    c: "TouchableOpacity",
    d: "Input",
    monCoin: false,
  },
  {
    id: "3",//B
    title: "Hangisi listemele yapmak için kullanılabilir?",
    a: "RenderItem",
    b: "Flatlist",
    c: "TouchableOpacity",
    d: "TextInput",
    monCoin: false,
  },
  {
    id: "4",//A
    title: "Hangisi fotoğraf eklemeye yarar?",
    a: "Image",
    b: "Img",
    c: "Imaç",
    d: "Picture",
    monCoin: false,
  },
]

export default class Stage2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testValue: "",
      answers: [],
      error: "",
      totalPoint: 0,
      modalStatus: false,
      monCoin: 0,
    }
  }

  radioButtonRender = (valueA, valueB, valueC, valueD, labelValueA, labelValueB, labelValueC, labelValueD) => {
    return [
      { value: "A", label: labelValueA },
      { value: "B", label: labelValueB },
      { value: "C", label: labelValueC },
      { value: "D", label: labelValueD },
    ];
  }

  testRender = ({item}) => {
    const { answers } = this.state;
    return(
      <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Soru {item.id}</Text>
          <Text style={styles.sectionDescription}> {item.title}</Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <RadioForm
              radio_props={this.radioButtonRender(null, null, null, null, item.a, item.b, item.c, item.d)}
              buttonSize={RFValue(18)}
              labelStyle={[styles.sectionTitle, { fontSize: RFValue(15)}]}
              initial={999}
              buttonColor={'#4996b5'}
              onPress={(value) => {
                let answerFilter = answers.filter(data => data.questionNo == item.id);
                if(answerFilter.length == 0) {
                    this.setState(prevState => ({ answers: [...prevState.answers, {questionNo: item.id, answer: value}]}))
                } else {
                  if(answerFilter[0].answer != value) {
                    this.state.answers.map(answerItem => {
                      answerItem.answer = value;
                      this.forceUpdate()
                    })
                  }
                }
              }} />
          </View>
      </View>
    )
  }

  testCalculate = () => {
    const { answers, totalPoint } = this.state;
    if(answers.length < 4) {
      this.setState({ modalStatus: true, error: "Lütfen bütün soruları cevapladığınızdan emin olun."})
    } else {
      let aFilter = answers.filter(item => item.questionNo == "1");
      let bFilter = answers.filter(item => item.questionNo == "2");
      let cFilter = answers.filter(item => item.questionNo == "3");
      let dFilter = answers.filter(item => item.questionNo == "4");
      let testItemFilter1 = testItem.filter(item => item.id == "1");
      let testItemFilter2 = testItem.filter(item => item.id == "2");
      let testItemFilter3 = testItem.filter(item => item.id == "3");
      let testItemFilter4 = testItem.filter(item => item.id == "4");
      if(aFilter[0].answer == "C") {
        if(testItemFilter1[0].monCoin == false) {
          this.setState(prevState => ({ totalPoint: prevState.totalPoint + 25 }))
        }
        testItemFilter1[0].monCoin = true;
      }
      if(bFilter[0].answer == "D") {
        if(testItemFilter2[0].monCoin == false) {
          this.setState(prevState => ({ totalPoint: prevState.totalPoint + 25 }))
        }
        testItemFilter2[0].monCoin = true;
      }
      if(cFilter[0].answer == "B") {
        if(testItemFilter3[0].monCoin == false) {
          this.setState(prevState => ({ totalPoint: prevState.totalPoint + 25 }))
        }
        testItemFilter3[0].monCoin = true;
      }
      if(dFilter[0].answer == "A") {
        if(testItemFilter4[0].monCoin == false) {
          this.setState(prevState => ({ totalPoint: prevState.totalPoint + 25 }))
        }
        testItemFilter4[0].monCoin = true;
      }
      this.setState({ modalStatus: true,})
    }
    this.forceUpdate()
  }
    render() {
      const { totalPoint } = this.state;
        return (
          <SafeAreaView style={styles.body}>
            {/* <LottieView
              loop
              autoPlay
              style={{ backgroundColor: '#ccc', width: RFValue(150), height: RFValue(150), borderRadius: RFValue(75), marginBottom: PhoneHeight * 0.1}}
              source={require('./images/monkey.json')}/> */}
              <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end'}}>
                <Text> { totalPoint / 25}x </Text>
                <Image source={require('./images/monkey.gif')} style={{width: RFValue(40), height: RFValue(40), }} />
              </View>
            <FlatList
              data={testItem}
              keyExtractor={(item) => item.id}
              renderItem={this.testRender} />
              <TouchableOpacity onPress={this.testCalculate} style={{backgroundColor: '#4996b5', width: "50%", borderRadius: 10, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30, alignSelf: 'center', marginBottom: 10}}>
                <Text style={{color: '#fff', fontSize: 17,}}> Sonraki Teste Geç </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalStatus}
                onRequestClose={() => {
                  this.setState({ modalStatus: false})
                  // Alert.alert("Modal has been closed.");
                }} >
                  <View style={styles.modalContainer}>
                    {
                      this.state.error.length != 0 ?
                      <View>
                        <Text style={[styles.sectionDescription, { textAlign: 'center'}]}> {this.state.error} </Text>
                        <TouchableOpacity onPress={() => this.setState({ modalStatus: false, error: ""})} style={{backgroundColor: '#4996b5', width: "50%", borderRadius: 10, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30, alignSelf: 'center'}}>
                          <Text style={{color: '#fff', fontSize: 17}}> Devam Et </Text>
                        </TouchableOpacity>
                      </View>
                      :null
                    }
                    {
                      this.state.totalPoint != 0 ?
                      <View style={{padding: 10, backgroundColor: '#fff'}}>
                        <Text style={[styles.sectionDescription, { textAlign: 'center', }]}> Tebrikler { totalPoint / 25} maymuncuk kazandınız.</Text>
                        {
                          (totalPoint / 25) < 4 ?
                          <Text style={[styles.sectionDescription, { textAlign: 'center', marginHorizontal: 10}]}> Sonraki teste geçebilmeniz için toplam 4 maymuncuk kazanmanız gerekmektedir.</Text>:null
                        }
                        <TouchableOpacity onPress={() => {
                          if(totalPoint / 25 == 4) {
                            Actions.stage3()
                          }
                          this.setState({ modalStatus: false, error: ""})}} style={{backgroundColor: '#4996b5', width: "50%", borderRadius: 10, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30, alignSelf: 'center', marginBottom: (totalPoint / 25 < 4) ? 30:0}}>
                          <Text style={{color: '#fff', fontSize: 17}}> Devam Et </Text>
                        </TouchableOpacity>
                      </View>:null
                    }
                  </View>
              </Modal>
          </SafeAreaView>
        )
    }
}

const PhoneWidth = Dimensions.get("window").width;
const PhoneHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    body: {
      backgroundColor: Colors.white,
      flex: 1,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    modalContainer: {
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 10,
},
shadowOpacity: 0.53,
shadowRadius: 13.97,

elevation: 21,
backgroundColor: '#fff', width: PhoneWidth * 0.8, height: PhoneHeight * 0.2, marginTop: PhoneHeight * 0.4, alignSelf: 'center', borderRadius: 15,
justifyContent: 'center',
    }
  });