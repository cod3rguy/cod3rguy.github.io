// .postExcerpt .postBody 
(function(){
    var a = document.getElementsByClassName('postExcerpt') == undefined ? [] : document.getElementsByClassName('postExcerpt');
    var b = document.getElementsByClassName('postBody')[0] == undefined ? '' : document.getElementsByClassName('postBody')[0];
    
    if(a != []){
        for(var i = 0; i < a.length; i ++){
            let c = a[i].getElementsByTagName('a');
            for(var j = 0; j < c.length; j ++){
                c[j].target = '_blank';
            }
        }
    }
    if(b != ''){
        let c = b.getElementsByTagName('a');
        for(var i = 0; i < c.length; i ++){
            c[i].target = '_blank';
        }
    }
  
})();