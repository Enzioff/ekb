class DirectionMap {
    container;
    map;
    listItems;
    objectManager;
    geoObjects;
    clusterer;
    
    constructor(container) {
        this.container = container;
        this.listItems = this.container.querySelectorAll('[data-map-item]');
        this.map = null;
        this.objectManager = null;
        this.geoObjects = [];
        
        this.init();
    }
    
    init() {
        this.loadMap();
        
        this.listItems.forEach((item) => {
            item.addEventListener('click', () => this.updateMap(item))
        })
    }
    
    loadMap() {
        const init = () => {
            this.map = new ymaps.Map('map', {
                center: this.getCurrentPosition(),
                zoom: 13,
            });
            
            this.clusterer = new ymaps.Clusterer({
                preset: 'islands#invertedBlueClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: false,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
            });
            
            this.objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 30,
                clusterDisableClickZoom: true
            });
            
            this.objectManager.clusters.options.set('default#imageWithContent', 'islands#greenClusterIcons');
            this.initGeoObjects();
        }
        ymaps.ready(init);
    }
    
    initGeoObjects() {
        this.listItems.forEach((item, idx) => {
            this.geoObjects.push(this.geoObjectTemplate(item, idx))
        })
        
        this.clusterer.add(this.geoObjects);
        this.map.geoObjects.add(this.clusterer);
        
        if (this.listItems.length > 1) {
            const bounds = ymaps.geoQuery(this.geoObjects).getBounds();
            this.map.setBounds(bounds, {checkZoomRange: true, zoomMargin: 30});
        } else if (this.listItems.length === 1) {
            this.map.setCenter(this.geoObjects[0].geometry.getCoordinates(), 13);
        }
    }
    
    geoObjectTemplate(item, idx) {
        const lat = item.getAttribute('data-lat');
        const lan = item.getAttribute('data-lan');
        const description = item.getAttribute('data-description');
        const color = item.getAttribute('data-color');
        const IDLayout = ymaps.templateLayoutFactory.createClass(
            `
                <div style="position: relative; cursor:pointer;" class="placeMark" data-lat="${lat}" data-lan="${lan}">
                    <picture style="position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 30px; height: 30px; z-index: 1;">
                        <img style="display: block; width: 100%; height: 100%; object-fit: contain;" src="data:image/svg+xml,%3Csvg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.6667 4.46667C10.9667 1.38667 8.27999 0 5.91999 0C5.91999 0 5.91999 0 5.91332 0C3.55999 0 0.866652 1.38 0.166652 4.46C-0.613348 7.9 1.49332 10.8133 3.39999 12.6467C4.10665 13.3267 5.01332 13.6667 5.91999 13.6667C6.82665 13.6667 7.73332 13.3267 8.43332 12.6467C10.34 10.8133 12.4467 7.90667 11.6667 4.46667Z' fill='%23${color}'/%3E%3C/svg%3E%0A"/>
                    </picture>
                    <div style="position: absolute; top: 5px; left: 5px; color: white; width: 20px; height: 20px; text-align: center; line-height: 20px; font-size: 12px; font-weight: bold; z-index: 1;">${idx + 1}</div>
                    <div style="position: absolute; top: 0; left: 100%; display: flex; align-items: center; background-color: #FFFFFF; height: 30px; padding: 0 10px 0 25px; z-index: 0;">
                        <p>${description}</p>
                    </div>
                </div>
            `
        );
        const placeMark = new ymaps.Placemark(
            [lat, lan],
            {hintContent: `${description}`},
            {
                iconLayout: 'default#imageWithContent',
                iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+PC9zdmc+', // прозрачная картинка
                iconImageSize: [30, 30],
                iconImageOffset: [-15, -15],
                iconContentLayout: IDLayout
            }
        );
        
        placeMark.events.add('click', () => {
            this.updateClasses();
            item.classList.add('active');
            this.map.setCenter(this.getCurrentPosition(item))
        })
        
        return placeMark;
    }
    
    updateMap(item) {
        this.updateClasses();
        item.classList.add('active');
        
        this.map.setCenter(this.getCurrentPosition(item))
    }
    
    updateClasses() {
        this.listItems.forEach((item) => item.classList.remove('active'));
    }
    
    getCurrentPosition(mapElement) {
        if (!mapElement) {
            const currentItem = Array.from(this.listItems).filter(el => el.classList.contains('active'))[0];
            
            return [currentItem.getAttribute('data-lat'), currentItem.getAttribute('data-lan')]
        } else {
            return [mapElement.getAttribute('data-lat'), mapElement.getAttribute('data-lan')]
        }
    }
}

export default DirectionMap;
