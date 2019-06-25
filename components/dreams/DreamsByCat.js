import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import getAllDreamsCat from "../../actions/dreams/getAllDreamsCat";
import resetList from "../../actions/dreams/resetList";

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
      headerRight: (
        <Burger creationLink="DreamCreateViewList" navigation={navigation} />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = { messageError: null };
    this.leaveError = this.leaveError.bind(this);
    this.getAllCat = this.getAllCat.bind(this);
    this.formatedObject = this.formatedObject.bind(this);

    this.willFocusSub = this.props.navigation.addListener(
      "willFocus",
      payload => {
        if (!this.props.listDreamsCat) {
          this.props.getAllDreamsCat(this.leaveError);
        }
      }
    );
    this.willBlurSub = this.props.navigation.addListener(
      "willBlur",
      payload => {
        this.props.resetList();
      }
    );
  }

  componentDidMount() {
    this.props.getAllDreamsCat(this.leaveError);
  }

  componentWillUnmount() {
    // Remove the event listener
    this.props.resetList();
    this.willBlurSub.remove();
    this.willFocusSub.remove();
  }

  leaveError(message) {
    this.setState({ messageError: message });
  }

  getAllCat(listDreams) {
    let arrayCat = ["Derniers Ajouts"];
    listDreams.map(dream => {
      dream.catOfDream.map(cat => {
        if (!arrayCat.includes(cat)) {
          arrayCat.push(cat);
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
    // console.log("arrayCat", arrayCat);

    for (let index = 0; index < arrayCat.length; index++) {
      const cat = arrayCat[index];
      customObject[cat] = [];
      if (cat === "Derniers Ajouts") {
        customObject[cat] = listDreams.slice(0, 3);
      } else {
        for (let index = 0; index < listDreams.length; index++) {
          let dream = listDreams[index];
          for (let index = 0; index < dream.catOfDream.length; index++) {
            const dreamCat = dream.catOfDream[index];
            if (dreamCat === cat) {
              customObject[cat].push(dream);
              continue;
            }
          }
        }
      }
    }
    // console.log("customObject", customObject);

    return customObject;
  }

  render() {
    const { listDreams } = this.props;
    const { messageError } = this.state;
    let arrayCat = null;
    let objectFormated = null;
    if (listDreams.length > 0) {
      arrayCat = this.getAllCat(listDreams);
    }

    if (arrayCat && listDreams.length > 0) {
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
          arrayCat.map((cat, i) => (
            <View
              style={{
                paddingTop: commonsStyles.spacing.unit * 2,
                paddingBottom: commonsStyles.spacing.unit * 2
              }}
              key={i}
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
                {objectFormated[cat].slice(0, 3).map((dream, i) => (
                  <Col
                    onPress={() =>
                      this.props.navigation.navigate("DreamViewList", {
                        name: dream.name,
                        id: dream.idDream
                      })
                    }
                    key={i}
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
          <View style={commonsStyles.dream.section}>
            <Text style={{ color: commonsStyles.colors.primary }} h4>
              Chargement en cours ...
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    listDreams: state.dreams.listDreamsCat
  };
};

const mapDispatchToProps = {
  getAllDreamsCat,
  resetList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DreamsByCat);
