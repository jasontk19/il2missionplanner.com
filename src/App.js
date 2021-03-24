import React, { useState } from 'react';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector, xyz } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from "./Controls";

let styles = {
	'Point': new Style({
		image: new CircleStyle({
			radius: 10,
			fill: null,
			stroke: new Stroke({
				color: 'magenta',
			}),
		}),
	}),
	'Polygon': new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
	'MultiPolygon': new Style({
		stroke: new Stroke({
			color: 'blue',
			width: 1,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
};

const App = () => {
	const [center, setCenter] = useState([44.30, 48.43]);
	const [zoom, setZoom] = useState(9);
	const [showLayer1, setShowLayer1] = useState(true);
	const [showLayer2, setShowLayer2] = useState(true);

	const xyzSource = xyz({ 
		url: "https://tiles.il2missionplanner.com/stalingrad/{z}/{x}/{-y}.png",
		wrapX: false 
	});
	const osmSource = osm();

	return (
		<div>
			<Map center={fromLonLat(center)} zoom={zoom}>
				<Layers>
					<TileLayer
						source={xyzSource}
						zIndex={0}
					/>
					{/* {showLayer1 && (
						<VectorLayer
							source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
							style={styles.MultiPolygon}
						/>
					)} */}
				</Layers>
				<Controls>
					<FullScreenControl />
				</Controls>
			</Map>
		</div>
	);
}

export default App;
