// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn'
    }
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value                
            }
        },
        getDOMstrings: function(){
            return DOMstrings;
        },

        addListItem: function(item, type){
            // Orlogo zarlagiin elementiig aguulsan html-g beltgene.
            var html, list;

            if(type === 'inc'){
                list = '.income__list';
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">+ $$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = '.expenses__list';
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">- $$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Ter HTML dotroo orlogo zarlagiin utguudiig REPLACE ashiglaj uurchilj ugnu 
            html = html.replace('%id%', item.id);
            html = html.replace('$$DESCRIPTION$$', item.description);
            html = html.replace('$$VALUE$$', item.value);
            // Beltgesen HTML ee DOM ruu hiij ugnu.
            document.querySelector(list).insertAdjacentHTML('beforeend', html); 
        }
    }
})();

// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items:{
            inc: [],
            exp: []
        },

        totals:{
            inc: 0,
            exp: 0
        }
    }
    
    return{
        addItem: function(type, desc, val){
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else{
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type === 'inc'){
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);
            return item;

        },

        seeData: function(){
            return data;
        }
    }
})();

// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();

    console.log(input);
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    var item = financeController.addItem(input.type, input.description, input.value);
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
    uiController.addListItem(item, input.type);
    // 4. Төсвийг тооцоолно
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    };

    var setupEventListeners = function(){
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener("click", function() {
            ctrlAddItem();
        });
        
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    return{
        init: function(){
            console.log('Application started...');
            setupEventListeners();
        }
    }
})(uiController, financeController);

appController.init();