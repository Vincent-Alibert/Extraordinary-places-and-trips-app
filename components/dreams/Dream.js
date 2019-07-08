import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, ScrollView, Text } from "react-native";
import { Divider, Card } from "react-native-elements";
import BottomNavigation from "./BottomNavigation";
// actions
import getOneDream from "../../actions/dreams/getOneDream";
// styles
import commonsStyles from "../../assets/styles/commonsStyles";

export class Dream extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name") || "Dream"
      /* These values are used instead of the shared configuration! */
      // headerRight: <Burger navigation={navigation} />
    };
  };
  constructor(props) {
    super(props);
    this.state = { animation: false, dream: null };
    this.willFocusSub = this.props.navigation.addListener(
      "willFocus",
      payload => {
        const id = this.props.navigation.getParam("id");
        getOneDream(id).then(resp => {
          this.setState({ animation: true, dream: resp.data });
        });
      }
    );
    this.willBlurSub = this.props.navigation.addListener(
      "willBlur",
      payload => {
        this.setState({ animation: false, dream: null });
      }
    );
    this.leaveError = this.leaveError.bind(this);
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");

    if (id) {
      getOneDream(id)
        .then(resp => {
          this.setState({ animation: true, dream: resp.data });
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.leaveError(error.response);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            this.leaveError("Une erreur est survenue pendant la requête");
          } else {
            // Something happened in setting up the request that triggered an Error

            this.leaveError("Une erreur est survenue");
          }
        });
    } else {
      this.setState({ animation: true });
    }
  }
  leaveError(message) {
    this.setState({ messageError: message });
  }

  render() {
    const { dream, animation } = this.state;

    return (
      <View
        style={{
          paddingBottom: commonsStyles.spacing.unit * 13,
          paddingTop: commonsStyles.spacing.unit,
          flex: 1
        }}
      >
        <ScrollView style={{ paddingBottom: commonsStyles.spacing.unit * 12 }}>
          {animation ? (
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
                  {dream.catOfDream.map((cat, i) => {
                    return (
                      <Card
                        key={i}
                        containerStyle={{ padding: commonsStyles.spacing.unit }}
                      >
                        <Text>{cat}</Text>
                      </Card>
                    );
                  })}
                </View>
              </View>
              <View style={commonsStyles.dream.section}>
                <Text style={{ color: commonsStyles.colors.primary }} h4>
                  Voyage prévu
                </Text>
                {dream.travel ? (
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
                        {dream.catOfTransport.map((cat, i) => (
                          <Card
                            key={i}
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
        {dream && (
          <BottomNavigation
            dream={dream}
            routeName={this.props.navigation.state.routeName}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}
export default Dream;
