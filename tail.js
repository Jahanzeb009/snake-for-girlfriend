// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { SettingsContext } from './settings/SettingsContext';

// class Tail extends Component {
//     static contextType = SettingsContext;
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         const tailList = this.props.elements.map((pos, i) => {
//             return (
//                 <View
//                     key={i}
//                     style={[
//                         styles.tail,
//                         {
//                             width: this.props.size,
//                             height: this.props.size,
//                             left: pos[0] * this.props.size,
//                             top: pos[1] * this.props.size,
//                             backgroundColor: this.context.theme.complementary2,
//                             borderColor: this.context.theme.primary,
//                         },
//                     ]}
//                 />
//             );
//         });

//         return <View>{tailList}</View>;
//     }
// }

// const styles = StyleSheet.create({
//     tail: {
//         position: 'absolute',
//         borderWidth: 1,
//     },
// });

// export { Tail };


import React, { Component, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingsContext } from './settings/SettingsContext';

const Tail = (props) => {

    const context = useContext(SettingsContext);

    const tailList = props.elements.map((pos, i) => {
        return (
            <View
                key={i}
                style={[
                    styles.tail,
                    {
                        width: props.size,
                        height: props.size,
                        left: pos[0] * props.size,
                        top: pos[1] * props.size,
                        backgroundColor: context.theme.complementary2,
                        borderColor: context.theme.primary,
                    },
                ]}
            />
        );
    });

    return <View>{tailList}</View>;
}

const styles = StyleSheet.create({
    tail: {
        position: 'absolute',
        borderWidth: 1,
    },
});

export { Tail };
