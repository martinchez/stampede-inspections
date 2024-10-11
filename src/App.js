import React, { useEffect, useRef, useState } from 'react'
import './App.css' // Your custom styles
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easyPrint'

const App = () => {
  const mapRef = useRef(null)
  const [checkedLayers, setCheckedLayers] = useState(new Set())
  const layerMap = useRef({
    counties: L.geoJSON(null, { color: '#ff7000' }),
    rivers: L.geoJSON(null, { color: 'purple' }),
    sections: L.geoJSON(null, { color: '#0000FF' }),
    grid: L.geoJSON(null, { color: '#ee0000' }),
  })

  useEffect(() => {
    // Initialize Leaflet map
    mapRef.current = L.map('map').setView([35.4676, -97.5164], 12)

    // Base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current)

    // Load GeoJSON data
    fetch('./data/LandSectionswgs84.geojson')
      .then((response) => response.json())
      .then((data) => layerMap.current.sections.addData(data))

    fetch('./data/twprngwgs84.geojson')
      .then((response) => response.json())
      .then((data) => layerMap.current.grid.addData(data))

    fetch('./data/counties.geojson')
      .then((response) => response.json())
      .then((data) => layerMap.current.counties.addData(data))

    // Initialize leaflet-easyPrint plugin for exporting the map
    const printer = L.easyPrint({
      title: 'Export Map',
      position: 'topright',
      exportOnly: true,
      filename: 'LeafletMapExport',
      sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
      hideControlContainer: true,
    }).addTo(mapRef.current)

    // Cleanup on component unmount
    return () => {
      mapRef.current.remove()
    }
  }, [])

  const updateControlPanel = () => {
    const controlPanel = document.getElementById('control-panel')
    controlPanel.innerHTML = ''

    checkedLayers.forEach((layerName) => {
      const colorValue = document
        .querySelector(`input[data-layer="${layerName}"]`)
        .getAttribute('data-color')

      controlPanel.innerHTML += `
                <div class="layer-control">
                    <label>${layerName} Layer</label>
                    <input type="color" value="${colorValue}" id="color-${layerName}">
                    <input type="range" min="0" max="1" step="0.1" value="1" id="opacity-${layerName}">
                    <div class="layer-move">
                        <button class="move-layer" data-layer="${layerName}" data-direction="up">Up</button>
                        <button class="move-layer" data-layer="${layerName}" data-direction="down">Down</button>
                    </div>
                </div>
            `

      // Event listener for color change
      document
        .getElementById(`color-${layerName}`)
        .addEventListener('input', function () {
          const newColor = this.value
          layerMap.current[layerName].setStyle({ color: newColor })
        })

      // Event listener for opacity change
      document
        .getElementById(`opacity-${layerName}`)
        .addEventListener('input', function () {
          const newOpacity = this.value
          layerMap.current[layerName].setStyle({ opacity: newOpacity })
        })
    })

    controlPanel.style.display = checkedLayers.size > 0 ? 'block' : 'none'
  }

  const handleLayerChange = (layerName, checked) => {
    if (checked) {
      checkedLayers.add(layerName)
      layerMap.current[layerName].addTo(mapRef.current)
    } else {
      checkedLayers.delete(layerName)
      mapRef.current.removeLayer(layerMap.current[layerName])
    }
    setCheckedLayers(new Set(checkedLayers))
    updateControlPanel()
  }

  const handleExport = () => {
    const printer = L.easyPrint({
      title: 'Export Map',
      position: 'topright',
      exportOnly: true,
      filename: 'LeafletMapExport',
      sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
      hideControlContainer: true,
    }).addTo(mapRef.current)
    printer.printMap('CurrentSize', 'LeafletMapExport')
  }

  return (
    <div>
      <header>
        <div className="nav-left">
          <img src="logo.png" alt="Company Logo" className="logo" />
        </div>
        <div className="nav-right">
          <img src="logo.png" alt="Profile" className="profile-icon" />
        </div>
      </header>

      <main>
        <div className="map-container">
          <div id="map" style={{ width: '100%', height: '70vh' }}>
            <div className="controls" id="control-panel"></div>
          </div>
        </div>

        <div className="sidebar">
          <div className="category">
            <h3 className="category-title">Administrative Units</h3>
            <div className="subcategory">
              <label>
                <input
                  type="checkbox"
                  className="layer-checkbox"
                  data-layer="counties"
                  onChange={(e) =>
                    handleLayerChange('counties', e.target.checked)
                  }
                />
                Counties
              </label>
              <label>
                <input
                  type="checkbox"
                  className="layer-checkbox"
                  data-layer="sections"
                  onChange={(e) =>
                    handleLayerChange('sections', e.target.checked)
                  }
                />
                Land Sections
              </label>
              <label>
                <input
                  type="checkbox"
                  className="layer-checkbox"
                  data-layer="grid"
                  onChange={(e) => handleLayerChange('grid', e.target.checked)}
                />
                Land Grids
              </label>
            </div>
          </div>

          <div className="category">
            <h3 className="category-title">Hydrology</h3>
            <div className="subcategory">
              <label>
                <input
                  type="checkbox"
                  className="layer-checkbox"
                  data-layer="rivers"
                  onChange={(e) =>
                    handleLayerChange('rivers', e.target.checked)
                  }
                />
                Rivers
              </label>
            </div>
          </div>

          <button id="export-btn" onClick={handleExport}>
            Export Map
          </button>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
