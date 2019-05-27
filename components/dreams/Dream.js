import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import { Text, Divider, Card } from "react-native-elements";
import BottomNavigation from "./BottomNavigation";
import Burger from "../commons/Burger";
// actions
import getAllDreams from "../../actions/dreams/getAllDreams";
import commonsStyles from "../../assets/styles/commonsStyles";

export class Dream extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name") || "Dream",
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
      <View
        style={{
          paddingBottom: commonsStyles.spacing.unit * 13,
          paddingTop: commonsStyles.spacing.unit
        }}
      >
        <ScrollView style={{ paddingBottom: commonsStyles.spacing.unit * 12 }}>
          {dream ? (
            <React.Fragment>
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
              <View style={commonsStyles.dream.section}>
                <Text style={{ color: commonsStyles.colors.primary }} h4>
                  Voyage prévu
                </Text>
                {!dream.travel ? (
                  <React.Fragment>
                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Dates prévues
                      </Text>
                      <Text>{dream.date}</Text>
                    </View>
                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Moyen de transport
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          ...commonsStyles.dream.section
                        }}
                      >
                        {dream.catOfTransport.map(cat => (
                          <Card
                            key={cat.name}
                            containerStyle={{
                              padding: commonsStyles.spacing.unit
                            }}
                          >
                            <Text>{cat.name}</Text>
                          </Card>
                        ))}
                      </View>
                    </View>

                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Informations complémentaires sur le trajet
                      </Text>
                      <Text>{dream.infoTransport}</Text>
                    </View>
                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Coût total du trajet
                      </Text>
                      <Text>{dream.costTransport}</Text>
                    </View>
                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Hébergement
                      </Text>
                      <Text>{dream.infoTransport}</Text>
                    </View>
                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Coût total de l'hébergement
                      </Text>
                      <Text>{dream.costAccommodation}</Text>
                    </View>
                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Quoi faire autour
                      </Text>
                      <Text>{dream.whatTodo}</Text>
                    </View>
                    <View style={commonsStyles.dream.sectionTravel.section}>
                      <Text
                        style={{
                          color: commonsStyles.colors.primary,
                          ...commonsStyles.dream.sectionTravel.title
                        }}
                      >
                        Où manger
                      </Text>
                      <Text>{dream.whereToEat}</Text>
                    </View>
                  </React.Fragment>
                ) : (
                  <Text>Non</Text>
                )}
              </View>
              <Divider />
              <View style={commonsStyles.dream.section}>
                <Text style={{ color: commonsStyles.colors.primary }} h4>
                  Notes
                </Text>
                <Text>{dream.note}</Text>
              </View>
            </React.Fragment>
          ) : (
            <View style={commonsStyles.dream.section}>
              <Text style={{ color: commonsStyles.colors.primary }} h4>
                Chargement en cours ...
              </Text>
            </View>
          )}
        </ScrollView>
        {dream && <BottomNavigation />}
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
