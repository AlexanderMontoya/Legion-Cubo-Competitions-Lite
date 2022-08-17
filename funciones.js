var participantes=[];
let mezclas=[];
let listas_tiempos=[];
let avg_primera_ronda=[];
let avg_segunda_ronda=[];
let avg_tercera_ronda=[];
let cant_mezcla;
let cont_mezclas=0;
let r=0;
let contador_scramble=1;
let num_solve=1;
let iguales=false;


function categoria(){
    let categoria=document.getElementById('category').value;
    let pant_categoria=document.getElementById('categoria');
    let pant_inscripcion=document.getElementById('inscripcion');
    let idcategoria=document.getElementById('img_categoria');
    let imagen=`
        <img src="img/${categoria}.png" alt="categoria">
    `;
    idcategoria.classList.toggle('img_categoria');
    idcategoria.innerHTML=imagen;
    pant_categoria.classList.toggle('show_section');
    pant_inscripcion.classList.toggle('show_section');
}

function agregar_participante(){
    nombre_participante=document.getElementById('nombres').value;
    color_participante=document.getElementById('color').value;
    if(nombre_participante=="" || color_participante==""){
        alert("Falta ingresar un valor (Nombre o Color)");
    }else{
        let id_nuevo=participantes.length + 1;
        participantes.push([id_nuevo,nombre_participante,color_participante,0,0]);
        listas_tiempos.push([id_nuevo]);
        if(participantes.length>=2){document.getElementById('botongo').disabled=false;};
        document.getElementById('cant_participantes').innerHTML="Participantes: "+ participantes.length;
        document.getElementById('nombres').value="";
        document.getElementById('color').value="";    
    }
    
}

function go(){
    let pant_puntos=document.getElementById('pant_puntos');
    let pant_rondas=document.getElementById('pant_rondas');
    let pant_inscripcion=document.getElementById('inscripcion');
    if(participantes.length==1){
        alert("no se puede iniciar con solo un competidor");
    }else if(participantes.length==2){
        pant_inscripcion.classList.toggle('show_section');
        pant_puntos.classList.toggle('show_section');
    }else if(participantes.length>2){
        pant_inscripcion.classList.toggle('show_section');
        pant_rondas.classList.toggle('show_section');
    }
}

function cant_scrambles(cantidad){
    let pant_puntos=document.getElementById('pant_puntos');
    let pant_rondas=document.getElementById('pant_rondas');
    let pant_mezclas=document.getElementById('pant_mezclas');
    if(cantidad==1){
        let puntos=document.getElementById('puntos').value;
        cant_mezcla=parseInt(puntos)*2;
        pant_puntos.classList.toggle('show_section');
    }else if(cantidad==2){
        let rondas=document.getElementById('rondas').value;
        if(rondas==1){
            cant_mezcla=5;
        }else if(rondas==2){
            cant_mezcla=10;
        }else if(rondas==3){
            cant_mezcla=15;
        }
        pant_rondas.classList.toggle('show_section');
    }
    pant_mezclas.classList.toggle('show_section');
}

function agregar_Mezcla(){
    let mezcla=document.getElementById('mezcla').value;
    if(mezcla==""){
        alert("La mezcla esta vacia :v");
    }else{
        if (cont_mezclas<cant_mezcla){
            mezclas.push(mezcla);
            cont_mezclas++;
            if(cont_mezclas==cant_mezcla){
                document.getElementById('empezar').disabled=false;
                document.getElementById('mezcla').disabled=true;
                document.getElementById('agregar_mezcla').disabled=true;
            }
        }else{
            alert('Se alcanzo el limite de mezclas');
        }
        document.getElementById('label_mezclas').innerHTML="Solve: "+ mezclas.length;
        document.getElementById('mezcla').value="";    
    }
    
}

function inicio_competition(){
    let pant_mezclas=document.getElementById('pant_mezclas');
    let pant_participantes=document.getElementById('pant_participantes');
    pant_mezclas.classList.toggle('show_section');
    pant_participantes.classList.toggle('show_section');
    competition_play();
}

function ver_rondas(){
    if(participantes.length==2){
        document.getElementById('contenedor_versus').classList.toggle('contenedor_rondas_show')
    }else if(participantes.length>2){
        document.getElementById('contenedor_rondas').classList.toggle('contenedor_rondas_show');
    }
    
}

function competition_play(){
    let x=0;
    let total_participantes=`<div id="pant_mezcla"></div>`;
    let scramble=`<label class="label">${mezclas[0]}</label>`;
    let competidor;
    while(x<participantes.length){
        if(participantes.length==2){
            competidor=`
            <div class="competidor">
                <div class="color" id="color" style="background-color: ${participantes[x][2]}; width: 20px; height: 20px; border-radius: 5px; display: inline-block;"></div>
                <input type="text" id="participante" value="${participantes[x][1]}" class="input" disabled>
                <input type="text" id="tiempo${participantes[x][0]}" placeholder="Tiempo:" class="input input_pequeño">
                <input type="text" id="puntos${participantes[x][0]}" value="${participantes[x][4]}" class="input input_pequeño" disabled>
                <button onclick="agregarTiempo(${x})" id="boton${x+1}" class="botones">Subir tiempo</button>
            </div>`;
        }else if(participantes.length>2){
            competidor=`
            <div class="competidor">
                <div class="color" id="color" style="background-color: ${participantes[x][2]}; width: 20px; height: 20px; border-radius: 5px; display: inline-block;"></div>
                <input type="text" id="participante" value="${participantes[x][1]}" class="input" disabled>
                <input type="text" id="tiempo${participantes[x][0]}" placeholder="Tiempo:" class="input input_pequeño">
                <button onclick="agregarTiempo(${x})" id="boton${x+1}" class="botones">Subir tiempo</button>
            </div>`;
        }
        
        total_participantes= total_participantes + competidor;
        x++;
    };
    document.getElementById('pant_participantes').innerHTML=total_participantes;
    document.getElementById('pant_mezcla').innerHTML=scramble;
}

function agregarTiempo(id){
    tiempo=document.getElementById(`tiempo${id+1}`).value;
    boton=document.getElementById(`boton${id+1}`);
    caja_tiempo=document.getElementById(`tiempo${id+1}`);
    if(tiempo=="DNF" || tiempo=="dnf" || tiempo>0){
        listas_tiempos[id].push(tiempo);
        boton.disabled=true;
        caja_tiempo.disabled=true;
        r++;
    }else{
        alert('Digite un numero o penalidad(DNF)');
        document.getElementById(`tiempo${id+1}`).value="";
    }
    if (r==participantes.length){
        let newtiempo;
        let mejorTiempo=0;
        let idGanador;
        let contador_dnf=0;
        let num_iguales=false;
        let scramble=`<label class="label">${mezclas[contador_scramble]}</label>`;
        for(let n=0;n<r;n++){
            newtiempo=listas_tiempos[n][num_solve];
            if (newtiempo!="DNF" || newtiempo!="dnf"){
                if(newtiempo<mejorTiempo || mejorTiempo==0 ){
                    mejorTiempo=newtiempo;
                    idGanador=n;
                }else if(newtiempo==mejorTiempo){
                    num_iguales=true;
                }
            }
            if(newtiempo=="dnf" || newtiempo=="DNF"){
                contador_dnf++;
            }
            document.getElementById('pant_mezcla').innerHTML=scramble;
            document.getElementById(`tiempo${n+1}`).value="";
            document.getElementById(`boton${n+1}`).disabled=false;
            document.getElementById(`tiempo${n+1}`).disabled=false;
        };
        if(participantes.length==2 && num_iguales==false){
            if(contador_dnf!=participantes.length){
                participantes[idGanador][4]=participantes[idGanador][4]+1;
                document.getElementById(`puntos${idGanador+1}`).value=participantes[idGanador][4];
            };   
        }else if(participantes.length==2 && num_iguales==true){
            participantes[0][4]=participantes[0][4]+1;
            participantes[1][4]=participantes[1][4]+1;
            document.getElementById('puntos1').value=participantes[0][4];
            document.getElementById('puntos2').value=participantes[1][4];
            num_iguales=false;
            iguales=true
        }
        if(contador_scramble==5 && participantes.length>2){
            for (let k=0;k<=participantes.length-1;k++){
                /*calcular_avg(k);*/
                calcular_avg(k,1,5,"primera");
            }
            mostrar_primera_ronda();
            if(mezclas.length==5){
                document.getElementById('pant_participantes').classList.toggle('show_section');
            }
            document.getElementById('primera_ronda').classList.toggle('ronda_show');
            document.getElementById('boton_menu').classList.toggle('show');
        }else if(contador_scramble==10 && participantes.length>2){
            for (let k=0;k<=participantes.length-1;k++){
                /*calcular_avg(k);*/
                calcular_avg(k,6,10,"segunda");
            }
            mostrar_segunda_ronda();
            if(mezclas.length==10){
                document.getElementById('pant_participantes').classList.toggle('show_section');
            }
            document.getElementById('segunda_ronda').classList.toggle('ronda_show');
        }
        else if(contador_scramble==15 && participantes.length>2){
            for (let k=0;k<=participantes.length-1;k++){
                /*calcular_avg(k);*/
                calcular_avg(k,11,15,"tercera");
            }
            mostrar_tercera_ronda();
            if(mezclas.length==15){
                document.getElementById('pant_participantes').classList.toggle('show_section');
            }
            document.getElementById('tercera_ronda').classList.toggle('ronda_show');
        }
        if(contador_scramble>=1 && participantes.length==2){
            if(contador_scramble==1){document.getElementById('boton_menu').classList.toggle('show');};
            let conteiner =ver_versus_puntajes(idGanador,contador_scramble,iguales);
            document.getElementById('tabla_versus').innerHTML=conteiner;
            if(participantes[idGanador][4]>=mezclas.length/2){
                document.getElementById('pant_participantes').classList.toggle('show_section');
                ver_ganador_versus(idGanador);
                document.getElementById('ganador_versus').classList.toggle('ganador_versus_show');
            }
        }
        r=0;
        num_solve++;
        contador_scramble++;
    }
    else{
        idGanador=0;
        newtiempo=0;
        mejorTiempo=0;
    }
}

function mostrar_primera_ronda(){
    var sorted = avg_primera_ronda.slice().sort(function(a,b){return a-b})
    var ranks = avg_primera_ronda.map(function(v){ return sorted.indexOf(v)+1 });
    for (let k=0;k<=participantes.length-1;k++){
        if(avg_primera_ronda[k]=="DNF"){
            ranks[k]=90;
            console.log("participante"+k+"es dnf");
            console.log(ranks);
        }
    }
    let ultimo_contenedor= rondas_ranking(ranks,"Primera");
    document.getElementById('primera_ronda').innerHTML=ultimo_contenedor;
}

function mostrar_segunda_ronda(){
    document.getElementById('boton_segunda_ronda').classList.toggle('botones');
    var sorted2 = avg_segunda_ronda.slice().sort(function(a,b){return a-b})
    var ranks2 = avg_segunda_ronda.map(function(v){ return sorted2.indexOf(v)+1 });
    console.log(ranks2);
    for (let k=0;k<=participantes.length-1;k++){
        if(avg_segunda_ronda[k]=="DNF"){
            ranks2[k]=90;
            console.log("participante"+k+"es dnf");
        }
    }
    let ultimo_contenedor= rondas_ranking(ranks2,"Segunda");
    document.getElementById('segunda_ronda').innerHTML=ultimo_contenedor;
}

function mostrar_tercera_ronda(){
    document.getElementById('boton_tercera_ronda').classList.toggle('botones');
    var sorted3 = avg_tercera_ronda.slice().sort(function(a,b){return a-b})
    var ranks3 = avg_tercera_ronda.map(function(v){ return sorted3.indexOf(v)+1 });
    console.log(ranks3);
    for (let k=0;k<=participantes.length-1;k++){
        if(avg_segunda_ronda[k]=="DNF"){
            ranks3[k]=90;
            console.log("participante"+k+"es dnf");
        }
    }
    let ultimo_contenedor= rondas_ranking(ranks3,"Tercera");
    document.getElementById('tercera_ronda').innerHTML=ultimo_contenedor;
}

function rondas_ranking(ranks,ronda){
    let i=0;
    let j=0;
    let n=1;
    let participantes_dnf="";
    let personajes="";
    let avg;
    while(i<=participantes.length-1){
        participantes[i][5]=ranks[i];
        if(i==participantes.length-1){
            while(n<=participantes.length){
                while(j<=participantes.length-1){
                    if(ronda=="Primera"){avg=avg_primera_ronda[j]; num_scrambel=1}
                    else if(ronda=="Segunda"){avg=avg_segunda_ronda[j]; num_scrambel=6}
                    else if(ronda=="Tercera"){avg=avg_tercera_ronda[j];num_scrambel=11};
                    let rango=`
                        <tr>
                            <td><div class="color" id="color${participantes[j][0]}" style="background-color: ${participantes[j][2]}; width: 20px; height: 20px; border-radius: 5px; display: inline-block;"></div></td>
                            <td>${participantes[j][1]}</td>
                            <td class="tiempos">${listas_tiempos[j][num_scrambel]}</td>
                            <td class="tiempos">${listas_tiempos[j][num_scrambel+1]}</td>
                            <td class="tiempos">${listas_tiempos[j][num_scrambel+2]}</td>
                            <td class="tiempos">${listas_tiempos[j][num_scrambel+3]}</td>
                            <td class="tiempos">${listas_tiempos[j][num_scrambel+4]}</td>
                            <td>${avg}</td>
                        </tr>
                        `;
                    if(participantes[j][5]==n){
                        personajes=personajes+rango;
                    }else if(participantes[j][5]==90 && participantes_dnf==""){
                        participantes_dnf=participantes_dnf+rango;
                        console.log(participantes_dnf);
                    }
                    j++;
                }
                j=0;
                n++;
            }; 
        }
        i++;
    };
    personajes=personajes+participantes_dnf;
    return ultimo_contenedor=`
    <h2>${ronda} Ronda</h2>
    <table>
        <tr>
            <th>Color</th><th>Competidor</th><th class="tiempos">1</th><th class="tiempos">2</th><th class="tiempos">3</th><th class="tiempos">4</th><th class="tiempos">5</th><th>AVG</th>
        </tr>
        <tr>
            ${personajes}
        </tr>
    </table>`;
}

function calcular_avg(indicador,i_inicio,i_final,ronda){
    let menor=0;
    let mayor=0;
    let total=0;
    let avg5;
    let penalidad_dnf=0;
    while (i_inicio<=i_final){
        temp=listas_tiempos[indicador][i_inicio];
        if (temp=="DNF" || temp=="dnf"){
            penalidad_dnf++;
        }else{
            if(temp>mayor){
                mayor=parseFloat(temp);
            }
            if(temp<menor || menor==0){
                menor=parseFloat(temp);
            }
            total=total+parseFloat(temp);
        }
        i_inicio++
    }
    if(penalidad_dnf==1){
        avg5=((total-(menor))/3).toFixed(2)
        mayor="DNF";
    }
    else if (penalidad_dnf>=2){
        avg5="DNF";
        mayor="DNF";
    }else{
        avg5=((total-(mayor+menor))/3).toFixed(2);
    }

    if (ronda=="primera"){
        avg_primera_ronda.push(avg5);
    }else if(ronda=="segunda"){
        avg_segunda_ronda.push(avg5);
    }else if(ronda=="tercera"){
        avg_tercera_ronda.push(avg5);
    }
}

function ver_versus_puntajes(id,contador_scramble,igualitos){
    let tabla_versus=document.getElementById('tabla_versus').outerHTML;
    let cajitas="";
    if (igualitos==false){
        if(id==0){
            cajitas=`<td style="background-color:${participantes[0][2]};">1</td><td id="part2">0</td>`;
        }else if (id==1){
            cajitas=`<td >0</td><td id="part2" style="background-color:${participantes[1][2]};">1</td>`;
        }    
    }else if(igualitos==true){
        cajitas=`<td style="background-color:${participantes[0][2]};">1</td><td id="part2" style="background-color:${participantes[1][2]};">1</td>`;
        iguales=false;
    }
    let encabezados=
    `<tr>
        <th class="nombre">${participantes[0][contador_scramble]}</th><th></th><th></th><th class="nombre">${participantes[1][contador_scramble]}</th>
    </tr>`;
    let win=
    `<tr>
        <td>${listas_tiempos[0][contador_scramble]}</td>${cajitas}<td>${listas_tiempos[1][contador_scramble]}</td>
    </tr>`;
    if(contador_scramble==1){
        return conteiner=encabezados+win;
    }else if(contador_scramble>=2){
        return conteiner= tabla_versus+win;
    }
    
}

function ver_ganador_versus(id){
    let win =`
        <h4>Ganador</h4>
        <div class="img_ganador" style="background-color:${participantes[id][2]};">
            <i class="fa-solid fa-user"></i>
        </div>
        <h4>${participantes[id][1]}</h4>
    `;
    document.getElementById('ganador_versus').innerHTML=win;
}

function ver_primera_ronda(){
    document.getElementById('primera_ronda').classList.toggle('ronda_show');
}
function ver_segunda_ronda(){
    document.getElementById('segunda_ronda').classList.toggle('ronda_show');
}
function ver_tercera_ronda(){
    document.getElementById('tercera_ronda').classList.toggle('ronda_show');
}
