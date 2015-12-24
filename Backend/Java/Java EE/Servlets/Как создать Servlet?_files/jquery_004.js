/**
 * @name		Shuffle Letters
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license		MIT License
 */

(function($){
	
	$.fn.shuffleLetters = function(prop){
		
		var options = $.extend({
			"step"		: 8,			// Сколько раз должны меняться символы
			"fps"		: 10,			// Кадров в секунду
			"text"		: "", 			// Использовать данный текс вместо содержимого
			"callback"	: function(){}	// Выполняется при заверешении анимации
		},prop)
		
		return this.each(function(){
			
			var el = $(this),
				str = "";


			// Для предотвращения одновременных анимаций используем флаг

			if(el.data('animated')){
				return true;
			}
			
			el.data('animated',true);
			
			
			if(options.text) {
				str = options.text.split('');
			}
			else {
				str = el.text().split('');
			}
			
			// Массив types содержит типы символов
			// Массив letters сохраняет положение символов, отличных от пробела
			
			var types = [],
				letters = [];

			// Looping through all the chars of the string
			
			for(var i=0;i<str.length;i++){
				
				var ch = str[i];
				
				if(ch == " "){
					types[i] = "space";
					continue;
				}
				else if(/[a-z]/.test(ch)){
					types[i] = "lowerLetter";
				}
				else if(/[A-Z]/.test(ch)){
					types[i] = "upperLetter";
				}
				else {
					types[i] = "symbol";
				}
				
				letters.push(i);
			}
			
			el.html("");			

			// Самовыполняющаяся функция
			
			(function shuffle(start){
			
				// Данный код выполняется несколько раз в секунду (определяется опцией fps)
				// и обновляет содержание элемента страницы
					
				var i,
					len = letters.length, 
					strCopy = str.slice(0);	// Свежая копия строки
					
				if(start>len){
					
					// Анимация завершена. Обновляем флаг и 
					// запускаем возвратную функцию
					
					el.data('animated',false);
					options.callback(el);
					return;
				}
				
				// Все работы выполняются здесь
				for(i=Math.max(start,0); i < len; i++){

					//Аргумент start и опция step ограничивают символы,
					//которые обрабатываются за один раз
					
					if( i < start+options.step){
						// Генерируем случайный символ в данной позиции
						strCopy[letters[i]] = randomChar(types[letters[i]]);
					}
					else {
						strCopy[letters[i]] = "";
					}
				}
				
				el.text(strCopy.join(""));
				
				setTimeout(function(){
					
					shuffle(start+1);
					
				},1000/options.fps);
				
			})(-options.step);
			

		});
	};
	
	function randomChar(type){
		var pool = "";
		
		if (type == "lowerLetter"){
			pool = "01"; //abcdefghijklmnopqrstuvwxyz0123456789
		}
		else if (type == "upperLetter"){
			pool = "10"; //ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
		}
		else if (type == "symbol"){
			pool = ",.?/\\(^)![]{}*&^%$#'\"";
		}
		
		var arr = pool.split('');
		return arr[Math.floor(Math.random()*arr.length)];
	}
	
})(jQuery);