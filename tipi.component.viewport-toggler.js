function setViewportToggler() {
    var viewportTogglerElements = {
        'root' : 'viewport-toggler',
        'toggle' : 'viewport-toggler-toggle',
        'item' : 'viewport-toggler-item'
    };

    var viewportTogglerStates = {
        'ready' : '__viewport-toggler--ready',
        'active' : '__viewport-toggler--active'
    };

    var viewportToggler = $('.' + viewportTogglerElements.root).not('.' + viewportTogglerStates.ready);
    if(viewportToggler.length > 0) {
        viewportToggler.each(function() {
            var viewportTogglerEach = $(this);
            var viewportTogglerToggle = getViewportTogglerElement(viewportTogglerEach, 'toggle', viewportTogglerElements);
            var viewportTogglerItem = getViewportTogglerElement(viewportTogglerEach, 'item', viewportTogglerElements);

            if(viewportTogglerToggle.length > 0 && viewportTogglerItem.length > 0) {
                viewportTogglerEach.addClass(viewportTogglerStates.ready);

                viewportTogglerEach.on({
                    'tipi.viewportToggler.toggle' : function(event, viewportToggler) {
                        toggleViewportToggler(viewportToggler, viewportTogglerStates);
                    }
                });

                viewportTogglerToggle.on({
                    click : function(event) {
                        event.preventDefault();

                        var toggle = $(this);
                        var viewportToggler = getViewportTogglerElement(toggle, 'root', viewportTogglerElements);

                        if(typeof viewportToggler != 'undefined') {
                            if(viewportToggler.length > 0) {
                                viewportToggler.trigger('tipi.viewportToggler.toggle', [viewportToggler]);
                            }
                        }
                    }
                })
            }
        });
    }
}

function toggleViewportToggler(viewportToggler, viewportTogglerStates) {
    viewportToggler.toggleClass(viewportTogglerStates.active);
}

function getViewportTogglerElement(origin, type, viewportTogglerElements) {
    if(typeof origin != 'undefined' && typeof type != 'undefined') {
        var element;

        switch(type) {
            case 'root' :
                element = origin.parents('.' + viewportTogglerElements.root).first();
                break;
            case 'toggle' :
                element = origin.find('.' + viewportTogglerElements.toggle);
                break;
            case 'item' :
                element = origin.find('.' + viewportTogglerElements.item).first();
                break;
            default:
                return;
        }

        return element;
    }
}