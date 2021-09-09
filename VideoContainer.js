
import PropTypes from 'prop-types';
import { requireNativeComponent, View } from 'react-native';

var iface = {
    name: 'VideoContainer',
    PropTypes: {
        displayType: PropTypes.string,
        videosrc: PropTypes.string,
        ...View.propTypes // include the default view properties
    }
}

module.exports = requireNativeComponent('VideoContainer', iface);