import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import getAllDreams from "../../actions/dreams/getAllDreams";

import Burger from "../commons/Burger";
import { Card } from "react-native-elements";
import commonsStyles from "../../assets/styles/commonsStyles";
import { Col, Grid } from "react-native-easy-grid";

export class DreamsByCat extends Component {
  static propTypes = {};

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: "Vos rêves",
      /* These values are used instead of the shared configuration! */
      headerRight: <Burger navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.state = { messageError: null };
    this.leaveError = this.leaveError.bind(this);
    this.getAllCat = this.getAllCat.bind(this);
    this.formatedObject = this.formatedObject.bind(this);
  }

  componentDidMount() {
    if (!this.props.listDreams) {
      this.props.getAllDreams(this.leaveError);
    }
  }

  leaveError(message) {
    this.setState({ messageError: message });
  }

  getAllCat(listDreams) {
    let arrayCat = ["Derniers Ajouts"];
    listDreams.map(dream => {
      dream.catOfDream.map(cat => {
        if (!arrayCat.includes(cat.name)) {
          arrayCat.push(cat.name);
        }
      });
    });
    return arrayCat;
  }

  formatedObject(arrayCat, listDreams) {
    let customObject = {};

    listDreams.sort((a, b) => {
      return a.idDream < b.idDream;
    });

    arrayCat.forEach(cat => {
      customObject[cat] = [];
      if (cat === "Derniers Ajouts") {
        customObject[cat] = listDreams.slice(0, 3);
      } else {
        for (let index = 0; index < listDreams.length; index++) {
          let dream = listDreams[index];
          dream.catOfDream.forEach(dreamCat => {
            if (dreamCat.name === cat) {
              customObject[cat].push(dream);
            }
          });
        }
      }
    });

    return customObject;
  }

  render() {
    const { listDreams } = this.props;
    const { messageError } = this.state;
    let arrayCat = null;
    let objectFormated = null;

    if (listDreams) {
      arrayCat = this.getAllCat(listDreams);
    }

    if (arrayCat && listDreams) {
      objectFormated = this.formatedObject(arrayCat, listDreams);
    }
    return (
      <ScrollView
        style={{
          paddingLeft: commonsStyles.spacing.unit * 2,
          paddingRight: commonsStyles.spacing.unit * 2,
          paddingBottom: commonsStyles.spacing.unit * 2
        }}
      >
        {objectFormated && arrayCat ? (
          (messageError && <Text>Une erreur est survenue. {messageError}</Text>,
          arrayCat.map(cat => (
            <View
              style={{
                paddingTop: commonsStyles.spacing.unit * 2,
                paddingBottom: commonsStyles.spacing.unit * 2
              }}
              key={cat}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 4 }}>{cat}</Text>
                <Text
                  onPress={() =>
                    this.props.navigation.navigate("DreamsForOneCatView", {
                      categorie: cat
                    })
                  }
                  style={{ flex: 1, color: commonsStyles.colors.primary }}
                >
                  Tout voir
                </Text>
              </View>

              <Grid>
                {objectFormated[cat].map(dream => (
                  <Col
                    onPress={() =>
                      this.props.navigation.navigate("DreamView", {
                        name: dream.name,
                        id: dream.idDream
                      })
                    }
                    key={dream.idDream}
                  >
                    <Card
                      containerStyle={{
                        height: 80,
                        padding: commonsStyles.spacing.unit,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold"
                        }}
                      >
                        {dream.name}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Grid>
            </View>
          )))
        ) : (
          <Text
            style={{
              paddingTop: commonsStyles.spacing.unit * 6,
              paddingLeft: commonsStyles.spacing.unit * 2,
              paddingRight: commonsStyles.spacing.unit * 2,
              paddingBottom: commonsStyles.spacing.unit * 2
            }}
          >
            Chargement en cours
          </Text>
        )}
      </ScrollView>
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
)(DreamsByCat);
