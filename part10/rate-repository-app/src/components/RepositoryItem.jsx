import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 15
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 5
    },
    row: {
      flexDirection: 'row'
    },
    column: {
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 1,
      justifyContent: 'space-between'
    },
    language: {
      color: 'white',
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      padding: 5
    },
    languageBox: {
      alignItems: 'baseline',
      marginBottom: 5
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    statsColumn: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  });

  const FormattedNumber = ({ number }) => {
    const formatted = number > 999 ? (number / 1000).toFixed(1) + 'k' : number;
    console.log(formatted);
    return <Text fontWeight="bold">{formatted}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.column}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={{ marginBottom: 5 }}
          >
            {item.fullName}
          </Text>
          <Text style={{ marginBottom: 5 }}>{item.description}</Text>
          <View style={styles.languageBox}>
            <Text style={styles.language}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statsColumn}>
          <FormattedNumber number={item.stargazersCount} />
          <Text>Stars</Text>
        </View>
        <View style={styles.statsColumn}>
          <FormattedNumber number={item.forksCount} />
          <Text>Forks</Text>
        </View>
        <View style={styles.statsColumn}>
          <FormattedNumber number={item.reviewCount} />
          <Text>Reviews</Text>
        </View>
        <View style={styles.statsColumn}>
          <FormattedNumber number={item.ratingAverage} />
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
