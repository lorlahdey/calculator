import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
    const [input, setInput ] = useState('0')
    const [output, setOutput ] = useState('')
    const calcKeys = ['C', '()',  '%', '/', '1', '2', '3', '*', '4', '5', '6', '+', '7', '8', '9', '-', '.', '0', '000', '=', ]

    console.log('all good')
    const handleSpecialBtnStyle = (key) => {
        const specialButtons = ['C', '()', '%', '/', '*', '+', '-', '='];
        if (key === 'C') {
            return [styles.specialBtn, styles.buttonC];
        } else if (key === '=') {
            return [styles.specialBtn, styles.buttonEquals];
        } else {
            return specialButtons.includes(key) ? styles.specialBtn : '';
        }
    };

    const handleButtonPress = (key) => {
        if (key === '=') {
            try {
                setOutput(eval(input).toString())
                setInput('0');
            }
            catch(err) {
                setOutput('error')
            }
        } else if (key === 'C') {
            setInput('0')
            setOutput('')
        } else {
            setInput((prevInput) => {
                if (prevInput === '0') {
                    return key;
                }
                return prevInput + key
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.resultContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Calculator</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputText}
                        value={input}
                        onChangeText={setInput}
                        keyboardType='numeric'
                    />   
                    <Text style={styles.resultText}>{output}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                {calcKeys.map((calcKey, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.buttons}
                        onPress={() => handleButtonPress(calcKey)}
                    >
                        <Text style={[styles.buttonText, handleSpecialBtnStyle(calcKey)]}>{calcKey}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        color: '#2E2D30',
        alignSelf:'center',
    },
    resultContainer: {
        flex: 1,
        justifyContent: "space-around",
        backgroundColor: '#F2F2F4'
    },
    inputContainer: {
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    resultText: {
        fontSize: 45,
    },
    inputText: {
        fontSize: 20,
        color : '#A0A0A0'
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        // paddingBottom: 40,
    },
    buttons: {
        fontSize: 24,
        width: '25%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 27,
    },
    specialBtn: {
        color: '#3AAAF3'
    },
    buttonC: {
        color: '#DD9C78',
    },
    buttonEquals: {
        color: '#fff',
        backgroundColor: '#3AAAF3',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 7,
    }
});
