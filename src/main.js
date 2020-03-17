import './index.css';
import compilation from './index';
compile.addEventListener('click', function () {
    compilation({
        source: source.value,
        filename: 'App.vue',
        sourceRoot: 'src',
    }).then((result, err)=>{
        if(err){
            compiled.value = err;
        }
        compiled.value = result;
    })
    
})