# Web Map Dashboard

## Overview

The Web Map Dashboard is a React application that integrates Leaflet for interactive map visualization. It allows users to view and manipulate geographical data through various layers, including administrative units and hydrological features. The dashboard provides an intuitive interface for exporting maps and customizing layer properties.

## Features

- Interactive map using Leaflet
- Layer management for administrative units and hydrological features
- Control panel for layer opacity and color customization
- Export functionality to save the current map view
- Responsive design

## Technologies Used

- **React**: For building the user interface.
- **Leaflet**: For interactive map features.
- **CSS**: For styling the application.
- **JavaScript**: For adding dynamic behavior to the application.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/martinchez/stampede-inspections.git
   cd web-map-dashboard

# Getting Started with Create React App Library not installed yet

npm install leaflet leaflet-easyPrint




Data sets to start with:

OK Maps [https://okmaps.org/ogi/search.aspx]
https://okmaps.org/ogi/WMS.aspx
The data sets I am interested in displaying/downloading:
• Hydrology | HUC12 Watershed Boundary
• Land Grids | Township/Range and Sections
o Instead of displaying this information via layer control, is it possible to have a dynamic callout on the page that lists the current values based on the map limits?
• Land Parcels | Statewide Parcels
• Lidar Elevation Data | Oklahoma Bare Earth Contours or Oklahoma Bare Earth DEM. The download would need to route to shp files.


I have multiple other data sources to add to this when ready. Like the above, I will only need specific data from each source below.
If we can make the above work, I am confident that adding the below wont be an issue.
I am unsure if it would be better to download and host some of this data, please think about that and let me know… It may make sense for the smaller and nonupdated sets.

Additional Data to add in the future….
OKC Data Portal
• https://data.okc.gov/portal/page/api
• https://data.okc.gov/portal/page/catalog
 2015 Contours
 Zoning by Address

FEMA
• https://www.fema.gov/about/openfema/developer-resources
• https://www.fema.gov/about/openfema/api
USDA
• https://sdmdataaccess.sc.egov.usda.gov/WebServiceHelp.aspx
• https://sdmdataaccess.sc.egov.usda.gov/documents/SoilDataAccessQueryGuide.pdf
• https://sdmdataaccess.sc.egov.usda.gov/documents/ConstrainingAQueryToAnAreaOfInterest.pdf
• https://nasis.sc.egov.usda.gov/NasisReportsWebSite/limsreport.aspx?report_name=SDA-HydrologicSoilGroup
USGS
• https://apps.nationalmap.gov/tnmaccess/#/


