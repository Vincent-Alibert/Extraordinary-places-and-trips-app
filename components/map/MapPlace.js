import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MapView } from "expo";
import { Marker } from "react-native-maps";
import Burger from "../commons/Burger";
// actions
import getAllDreams from "../../actions/dreams/getAllDreams";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 10;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapPlace extends Component {
  static propTypes = {};
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Extraordinary places",
      /* These values are used instead of the shared configuration! */
      headerRight: <Burger navigation={navigation} />
    };
  };
  constructor(props) {
    super(props);
    this.state = { messageError: null, isLoading: false };
    this.leaveError = this.leaveError.bind(this);
  }

  componentDidMount() {
    this.props.getAllDreams(this.leaveError);
  }

  leaveError(message) {
    this.setState({ messageError: message });
  }

  render() {
    const { listDreams } = this.props;
    return listDreams ? (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: listDreams[0].latLng.lat,
          longitude: listDreams[0].latLng.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
        {listDreams.map((dream, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: dream.latLng.lat,
              longitude: dream.latLng.lng
            }}
            title={dream.name}
            description={dream.note}
          />
        ))}
      </MapView>
    ) : (
      <View>
        <Text>Chargement en cours ...</Text>
      </View>
    );
  }
}
//
// 1.7841071
const mapStateToProps = state => ({
  listDreams: state.dreams.listeDreams
});

const mapDispatchToProps = {
  getAllDreams
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPlace);
