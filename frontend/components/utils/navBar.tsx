import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NavBar = () => {
    const buttonSize = 25
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity>
            <Icon name="home-outline" size={buttonSize} color="#FF007F" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Icon name="person-outline" size={buttonSize} color="#FF007F" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Icon name="chatbubble-outline" size={buttonSize} color="#FF007F" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Icon name="settings-outline" size={buttonSize} color="#FF007F" />
            </TouchableOpacity>
        </View>
    )
}

export default NavBar

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#222',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#444',
        borderRadius: 10
    },
  });
  