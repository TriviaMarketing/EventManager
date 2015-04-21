var EventManager = new (function()
{
    var eventPile = {};
    
    
    
    var addEventListener = function(eventId, callback)
    {
        if (!eventPile[eventId])
        {
            eventPile[eventId] = [];
        }
        eventPile[eventId].push(callback);
    };
    
    
    
    var emit = function(eventId, data)
    {
        if (eventPile[eventId])
        {
            for (var i = 0; i < eventPile[eventId].length; ++i)
            {
                (function()
                {
                    var index = i;
                    setTimeout(function()
                    {
                        eventPile[eventId][index](data);
                    }, 0);
                })();
            }
        }
    };
    
    
    
    this.makeEventAware = function(element)
    {
        if (typeof element === 'function')
        {
            // Class constructor
            element.prototype.addEventListener = addEventListener;
            element.prototype.emit = emit;
        }
        else
        {
            // Object
            element.addEventListener = addEventListener;
            element.emit = emit;
        }
    }
})();
