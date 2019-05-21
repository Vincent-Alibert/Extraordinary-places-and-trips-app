import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text, Divider, Card } from "react-native-elements";
import Burger from "../commons/Burger";
// actions
import getAllDreams from "../../actions/dreams/getAllDreams";
import commonsStyles from "../../assets/styles/commonsStyles";

export class Dream extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name"),
      /* These values are used instead of the shared configuration! */
      headerRight: <Burger navigation={navigation} />
    };
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.listDreams) {
      this.props.getAllDreams();
    }
  }

  render() {
    const { listDreams } = this.props;
    const idDream = this.props.navigation.getParam("id") || 1;
    let currentDream, dream;
    if (listDreams) {
      currentDream = listDreams.filter(dream => {
        return dream.idDream === idDream;
      });
      dream = currentDream[0];
    }
    return (
      <View style={{ paddingTop: commonsStyles.spacing.unit }}>
        {dream ? (
          <View>
            <View style={commonsStyles.dream.section}>
              <Text style={{ color: commonsStyles.colors.primary }} h4>
                Nom du rêve
              </Text>
              <Text>{dream.name}</Text>
            </View>
            <Divider />
            <View style={commonsStyles.dream.section}>
              <Text style={{ color: commonsStyles.colors.primary }} h4>
                Pays
              </Text>
              <Text>{dream.country}</Text>
              <Text style={{ color: commonsStyles.colors.primary }} h4>
                Adresse
              </Text>
              <Text>{dream.adress}</Text>
            </View>
            <Divider />
            <View style={commonsStyles.dream.section}>
              <Text style={{ color: commonsStyles.colors.primary }} h4>
                Catégorie
              </Text>
              <View style={{ flexDirection: "row" }}>
                {dream.catOfDream.map(cat => (
                  <Card
                    key={cat.name}
                    containerStyle={{ padding: commonsStyles.spacing.unit }}
                  >
                    <Text>{cat.name}</Text>
                  </Card>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={{ color: commonsStyles.colors.primary }} h4>
              Chargement en cours ...
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listDreams: state.dreams.listeDreams
});

const mapDispatchToProps = {
  getAllDreams
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dream);
