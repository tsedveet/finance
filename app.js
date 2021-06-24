var uiController = (function(){

})();

var financeController = (function(){

})();

var appController = (function(uiController, fnController){
    var ctrlAddItem = function(){
        // 1. oruulah ugugdliig delgetsees olj avna
        console.log('Delgetsnees ugugdul avah heseg');
        // 2. olj avsan ugugdluudee sanhuugiin controllert damjuulj hadgalana

        // 3. olj avsan ugugdluudee web deeree tohiroh hesegt n hadgalana

        // 4. tusviig tootsoolno

        // 5. etssiin uldegdel, tootsoog delgetsend gargana.
    };
    document.querySelector('.add__btn').addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
})(uiController, financeController);