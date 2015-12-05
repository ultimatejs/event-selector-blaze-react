if(Meteor.isServer) return EventSelectorBlazeLegacy = {}; //so server side rendering isn't broken

EventSelectorBlazeLegacy = {
		nodes: {},
	
    componentDidMount() {
			EventSelectorBlazeLegacy.nodes[this._reactId()] = this;
			this.bindEvents();
    },
    componentWillUnmount() {
			delete EventSelectorBlazeLegacy.nodes[this._reactId()];		
			this.unbindEvents();
    },
		componentDidUpdate() {
			this.unbindEvents();
	    this.bindEvents();
	  },
		
		
		bindEvents() {
			_.each(this.events(), (handler, key) => {
				let [event, selector] = this._eventAndSelector(key);
				let $el = $(selector, ReactDOM.findDOMNode(this));
				let self = this;
				
        $el.bind(event+'.'+this._reactId(), function(e) {
					let component = self._findComponent($(this));
					handler.apply(component, [e]); 	
        });
			});
	  },
		unbindEvents() {
			let $el = $(ReactDOM.findDOMNode(this));
			$el.unbind('.'+this._reactId());
		},
		
		
		_findComponent($el) {
			let reactId;
			
			while($el.length !== 0) {
				reactId = $el.data('reactid');
				
				if(EventSelectorBlazeLegacy.nodes[reactId]) return EventSelectorBlazeLegacy.nodes[reactId]; //component exists for reactId
				else $el = $el.parent('[data-reactid]'); //reactId corresponds to non-component element; find parent instead
			};
		},
		
		
		_eventAndSelector(key) {
			return key.trim().split(/\s(.+)?/);
		},
	 	_isEvent(method, name) {
			return this._eventsRegex.test(name) && _.isFunction(method);
		},	
		events() {
			return _.filterObject(Object.getPrototypeOf(this), this._isEvent);
		},
		_reactId() {
			return this._reactInternalInstance && this._reactInternalInstance._rootNodeID;
		},
		_eventsRegex: /^(click|dblclick|focus|blur|change|mouseenter|mouseleave|mousedown|mouseup|keydown|keypress|keyup|touchdown|touchmove|touchup)(\s|$)/
};