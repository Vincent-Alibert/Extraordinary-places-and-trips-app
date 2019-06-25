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
      headerRight: (
        <Burger creationLink="DreamCreateViewMap" navigation={navigation} />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = { messageError: null, isLoading: false };
    this.leaveError = this.leaveError.bind(this);
    this.willFocusSub = this.props.navigation.addListener(
      "willFocus",
      payload => {
        if (!this.props.listDreamsCat) {
          this.props.getAllDreams(this.leaveError);
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
    this.props.getAllDreams(this.leaveError);
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

  render() {
    const { listDreams } = this.props;
    return listDreams.length > 0 ? (
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
      <View style={commonsStyles.dream.section}>
        <Text style={{ color: commonsStyles.colors.primary }} h4>
          Chargement en cours ...
        </Text>
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
