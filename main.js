$(function(){
	localStorage.clear();
	const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];
	var turn = 'X';
	var sdatax =[];
	var sdatay =[];
	var cntr = 0;
	var z = $('.b').mouseenter(function(){
		var a =$(this ).children();
		$(this ).children().addClass('visible');
		$(this ).children().removeClass('result');
		$(this ).children().html(turn);
		return a;
		})
	$('.b').mouseleave(function(){
			$(z).children().addClass('result');
		});
	var Oele=[];
	var Xele=[];
	var id=[];
	
	var noclick=0;

	$('.b').click(function(){
		cntr +=1;
		var sid = localStorage.getItem('id');
		if(sid!=null){
			for(let i =0;i<sid.length;i++){
			if(sid[i] === $(this).attr('id') )
				noclick=1;
			}
		}
		if(noclick===1)
			noclick=0;
		else{
		id.push(parseInt($(this).attr('id')));
		localStorage.setItem('id', id);
		$(this).html(turn);
		if(turn==='O'){
			Oele.push( parseInt($(this).attr('id')));
			localStorage.setItem('O', JSON.stringify(Oele));
			sdatay = JSON.parse(localStorage.getItem(turn));
			turn ='X';

		}
		else{
			Xele.push( parseInt($(this).attr('id')));		
			localStorage.setItem('X', JSON.stringify(Xele));
			sdatax = JSON.parse(localStorage.getItem(turn));
			turn = 'O';
		}
		}
		if(cntr>4){
			won(turn,sdatax,sdatay);
		}
		
	})
	function won(turn,sdatax,sdatay){
		var comparex =new Array(8).fill(0);
		var comparey = new Array(8).fill(0);
		//console.log(cntr,sdatax,sdatay,turn);
		if(turn==="O"){
			for(let i= 0;i<winningConditions.length;i++){
				var a = winningConditions[i];
				for(let y = 0; y< sdatax.length;y++){
					if(sdatax[y] === a[0] || sdatax[y] === a[1] || sdatax[y] === a[2] ){
						comparex[i] +=1;
					}
			}
		}
		}
		else
		{
			for(let i= 0;i<winningConditions.length;i++){
				var a = winningConditions[i];
				for(let y = 0; y< sdatay.length;y++){
					if(sdatay[y] === a[0] || sdatay[y] === a[1] || sdatay[y] === a[2] ){
						comparey[i] +=1;
					}
			}	
		}
		}
		for(let q = 0 ;q<8;q++){
			if(comparex[q]===3 || comparey[q]===3){
				$('h1').toggleClass('result');
				if(turn==="O")
					$('h1').html(' X WIN THE GAME ');
				else
					$('h1').html(' O WIN THE GAME ');

				setTimeout(function(){
					modal();
				},1000);
			}
		}
	}
	$('button').click(reset);
	function reset(){
		$('#mj').show();
		$('.modal').hide();
		var a = '<span></span>'
		$('.b').html('');
		$('.b').append(a);
		$('.ans').addClass('result');
		localStorage.clear();
		 turn = 'X';
		 sdatax =[];
		 sdatay =[];
		 cntr = 0;
		 Oele=[];
		 Xele=[];
		 id=[];
		var noclick=0;
	}
	function modal(){
		$('#mj').hide();
		$('.modal').show();
		if(turn==='O')
			$('.msg').text('Congrats X wins');
		else
			$('.msg').text('Congrats O wins');		
		var counter = 3;
		var interval = setInterval(function() {
    		counter--;
    		$("#sec").text(counter);
    		if (counter == 0) {
        		clearInterval(interval);
   			}
		}, 1000);

		setTimeout(reset,4000)
	}
})
