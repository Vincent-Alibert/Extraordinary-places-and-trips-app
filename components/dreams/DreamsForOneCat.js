import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// actions
import getAllDreamsCat from "../../actions/dreams/getAllDreamsCat";
import resetList from "../../actions/dreams/resetList";

import Burger from "../commons/Burger";
import CustomGoBack from "../commons/CustomGoBack";
import { Card } from "react-native-elements";
import commonsStyles from "../../assets/styles/commonsStyles";
import { Col, Grid, Row } from "react-native-easy-grid";

export class DreamsForOneCat extends Component {
  static propTypes = {};

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("categorie"),
      /* These values are used instead of the shared configuration! */
      headerRight: (
        <Burger creationLink="DFOCCreateDream" navigation={navigation} />
      ),
      headerLeft: <CustomGoBack navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.state = { messageError: null };
    this.leaveError = this.leaveError.bind(this);
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

  formatedObject(listDreams) {
    const cat = this.props.navigation.getParam("categorie");

    let formatList = [];
    if (cat === "*") {
      formatList = [...listDreams];
    } else {
      formatList = [
        ...listDreams.filter(dream => dream.catOfDream.includes(cat) && dream)
      ];
    }
    return formatList;
  }

  render() {
    const { listDreams } = this.props;
    const { messageError } = this.state;
    const chunk = (arr, chunckSize) =>
      arr.reduce((chunks, value, index) => {
        const chunckIndex = Math.floor(index / chunckSize);
        const c = chunks[chunckIndex] || (chunks[chunckIndex] = []);
        c.push(value);
        return chunks;
      }, []);
    let listFormated = null;
    if (listDreams) {
      listFormated = this.formatedObject(listDreams);
    }

    return (
      <ScrollView
        style={{
          paddingLeft: commonsStyles.spacing.unit * 2,
          paddingRight: commonsStyles.spacing.unit * 2,
          paddingBottom: commonsStyles.spacing.unit * 2
        }}
      >
        {listFormated ? (
          <View
            style={{
              paddingTop: commonsStyles.spacing.unit * 2,
              paddingBottom: commonsStyles.spacing.unit * 2
            }}
          >
            {messageError && (
              <Text>Une erreur est survenue. {messageError}</Text>
            )}
            <Grid>
              {chunk(listFormated, 3).map((dreams, ind) => {
                return (
                  <Row key={ind}>
                    {dreams.map((dream, i) => {
                      return (
                        <Col
                          onPress={() =>
                            this.props.navigation.navigate("DFOCDreamView", {
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
                      );
                    })}
                  </Row>
                );
              })}
            </Grid>
          </View>
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
)(DreamsForOneCat);
