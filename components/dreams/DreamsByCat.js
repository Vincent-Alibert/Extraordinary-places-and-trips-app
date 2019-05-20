import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import getAllDreams from "../../actions/dreams/getAllDreams";

import Burger from "../commons/Burger";

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
    let arrayCat = ["Derniers Ajout"];
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
      for (let index = 0; index < listDreams.length; index++) {
        let dream = listDreams[index];
        dream.catOfDream.forEach(dreamCat => {
          if (dreamCat.name === cat) {
            customObject[cat].push(dream);
          }
        });
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
    console.log("objectFormated", objectFormated);
    return (
      <View>
        {objectFormated && arrayCat ? (
          <View>
            {messageError && (
              <Text>Une erreur est survenue. {messageError}</Text>
            )}
            {arrayCat.map(cat => {
              return (
                <View key={cat}>
                  <Text>{cat}</Text>

                  {objectFormated[cat].map(dream => (
                    <Text key={dream.idDream}>{dream.idDream}</Text>
                  ))}
                </View>
              );
            })}
          </View>
        ) : (
          <Text>Chargement en cours</Text>
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
)(DreamsByCat);
