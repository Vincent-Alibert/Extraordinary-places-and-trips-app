import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { Marker, Callout } from "react-native-maps";
import Burger from "../commons/Burger";
// actions
import getAllDreams from "../../actions/dreams/getAllDreams";
import resetList from "../../actions/dreams/resetList";
// style
import commonsStyles from "../../assets/styles/commonsStyles";

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
  componentWillUnmount() {
    // Remove the event listener
    this.props.resetList("map");
  }

  leaveError(message) {
    this.setState({ messageError: message });
  }

  render() {
    const { listDreams } = this.props;
    console.log("MAP listDreams ");
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
          >
            <Callout
              style={{
                padding: commonsStyles.spacing.unit,
                borderRadius: commonsStyles.spacing.unit
              }}
              onPress={() =>
                this.props.navigation.navigate("DreamViewMap", {
                  name: dream.name,
                  id: dream.idDream
                })
              }
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {dream.name}
                </Text>
                {dream.note && (
                  <Text>
                    {dream.note.substring(0, 50)}
                    {dream.note.length > 50 && "..."}
                  </Text>
                )}
              </View>
            </Callout>
          </Marker>
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
  listDreams: state.dreams.listDreams
});

const mapDispatchToProps = {
  getAllDreams,
  resetList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPlace);
