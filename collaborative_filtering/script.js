const fs = require('fs')

let rawdata = fs.readFileSync('./data.json');
let books = JSON.parse(rawdata);

// var dataSet = {};
// for (var i = 0; i < books.length; i++) {
// 	dataSet[books[i].user_id] = 
// 		{	
// 			...dataSet[books[i].user_id],	
// 			[books[i].book_id]: books[i].rating
// 		}
// }

// let data = JSON.stringify(dataSet);
// fs.writeFileSync('data.json',data);


var euclidean_score = function(dataset,p1,p2){
	var existp1p2 = {};

	for (var key in dataset[p1]){
		if(key in dataset[p2]){
			existp1p2[key] = 1;
		}
	if(len(existp1p2) ==0) {
		return 0;
		}

	var sum_of_euclidean_dist = [];

		for(item in dataset[p1]){
			if(item in dataset[p2]){
				sum_of_euclidean_dist.push(Math.pow(dataset[p1][item]-dataset[p2][item],2))
			}
		}

	var sum=0;
		for (var i = 0;i < sum_of_euclidean_dist.length;i++) {
			sum +=sum_of_euclidean_dist[i];	
		}

	var sum_sqrt = 1/(1 + Math.sqrt(sum));

	return sum_sqrt;
	}
}	

var pearson_correlation = function(dataset,p1,p2) {
	var existp1p2 = {};

	for (item in dataset[p1]){
		if(item in dataset[p2]){
			existp1p2[item] = 1
		}
	}
	var num_existence = len(existp1p2);

	if(num_existence ==0) {
		return 0;
	}

	var p1_sum = 0,
		p2_sum = 0,
		p1_sq_sum = 0,
		p2_sq_sum = 0,
		prod_p1p2 = 0;

	for (var item in existp1p2) {
		p1_sum +=dataset[p1][item];
		p2_sum +=dataset[p2][item];

		p1_sq_sum += Math.pow(dataset[p1][item],2);
		p2_sq_sum += Math.pow(dataset[p2][item],2);

		prod_p1p2 += dataset[p1][item]*dataset[p2][item];
	}

	var numerator = prod_p1p2 - (p1_sum*p2_sum/num_existence);

	var st1 = p1_sq_sum - Math.pow(p1_sum,2)/num_existence;
	var st2 = p2_sq_sum - Math.pow(p2_sum,2)/num_existence;

	var denominator = Math.sqrt(st1*st2);

	if(denominator ==0) {
		return 0;
	} else {
		var val = numerator / denominator;
		return val;
	}
}

var similar_user = function(dataset,person,num_user,distance) {
	var scores=[];

	for (var others in dataset){
		if (others != person && typeof(dataset[others])!="function"){
			var val = distance(dataset,person,others)
			var p = others
			scores.push({val:val,p:p});
		}
	}
	scores.sort(function(a,b){
		return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
	});
	var score = [];
	for (var i = 0; i < num_user; i++) {
		score.push(scores[i]);
	}
   return score;
}

var recomendation_eng = function(dataset,person,distance) {
	

	var totals = {
		setDefault:function(props,value){
			if(!this[props]) {
				this[props] = 0;
			}

	this[props] += value;
		}
	},
		simsum = {
			setDefault:function(props,value){
				if(!this[props]){
					this[props] = 0;
				}

				this[props] += value;
			}
		},
	rank_lst = [];

for (var other in dataset) {
	if(other === person) continue;

	var similar = distance(dataset,person,other);
	if(similar <= 0) continue;

	for(var item in dataset[other]){
		if(!(item in dataset[person])||(dataset[person][item]==0)){
			totals.setDefault(item,dataset[other][item]*similar);
			simsum.setDefault(item,similar);
		}
	}
}



for(var item in totals){
	if(typeof totals[item] != "function"){
		var val = totals[item]/ simsum[item];
		rank_lst.push({val:val,items:item});
	}
}

rank_lst.sort(function(a,b){
	return b.val < a.val ? -1 : b.val > a.val ?
	1 : b.val >= a.val ? 0 : NaN;
});
var recommend = [];
	for (var i in rank_lst) {
		recommend.push(rank_lst[i].items);
	}
	return [rank_lst,recommend];

}

var len = function(obj){
	var len=0;
	for (var i in obj){
		len++
	}
	return len;
}



// console.log(euclidean_score(books,'1','35'));
console.log(recomendation_eng(books,'1',euclidean_score));
