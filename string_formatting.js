#!/usr/local/bin/node

const Utility = require('util');
const FileSystem = require('fs');

function UtilityFormatSplit(){
	var presplit_time = Date.now();
	var fake_string = '';
	for(var i = 0; i < 1000000; i++){
		fake_string = Utility.format('This is %d.', i);
	}
	var postsplit_time = Date.now();
	return (postsplit_time - presplit_time);
}
function ConcatenationSplit(){
	var presplit_time = Date.now();
	var fake_string = '';
	for(var i = 0; i < 1000000; i++){
		fake_string = 'This is '+i+'.';
	}
	var postsplit_time = Date.now();
	return (postsplit_time - presplit_time);
}
function TemplateSplit(){
	var presplit_time = Date.now();
	var fake_string = '';
	for(var i = 0; i < 1000000; i++){
		fake_string = `This is ${i}.`;
	}
	var postsplit_time = Date.now();
	return (postsplit_time - presplit_time);
}

function UtilityFormatSplitWithConditions(){
	var presplit_time = Date.now();
	var fake_string = '';
	var format = '';
	for(var i = 0; i < 1000000; i++){
		format = 'This is %d';
		if( (i % 2) === 0 ){
			format += 'which is even (%d)';
			if( (i % 10) === 0 ){
				format += 'and a multiple of ten (%d).';
				fake_string = Utility.format(format, i, (i / 2), (i / 10));
			} else{
				format += '.';
				fake_string = Utility.format(format, i, (i / 2));
			}
		} else{
			format += '.';
			fake_string = Utility.format(format, i);
		}
	}
	var postsplit_time = Date.now();
	return (postsplit_time - presplit_time);
}
function ConcatenationSplitWithConditions(){
	var presplit_time = Date.now();
	var fake_string = '';
	for(var i = 0; i < 1000000; i++){
		fake_string = 'This is '+i;
		if( ( i % 2 ) === 0 ){
			fake_string += ' which is even ('+(i / 2)+')';
			if( ( i % 10 ) === 0 ){
				fake_string += ' and a multiple of ten ('+(i / 10)+').';
			} else{
				fake_string += '.';
			}
		} else{
			fake_string += '.';
		}
	}
	var postsplit_time = Date.now();
	return (postsplit_time - presplit_time);
}
function TemplateSplitWithConditions(){
	var presplit_time = Date.now();
	var fake_string = '';
	for(var i = 0; i < 1000000; i++){
		fake_string = `This is ${i}${((i % 2) === 0)?` which is even (${i/2})${((i % 10) === 0)?` and a multiple of ten (${i/10})`:''}`:''}.`;
	}
	var postsplit_time = Date.now();
	return (postsplit_time - presplit_time);
}

var results = {
	utilityformatsplit: [],
	concatenationsplit: [],
	templatesplit: [],
	utilityformatsplitwithconditions: [],
	concatenationsplitwithconditions: [],
	templatesplitwithconditions: []
};

for(var i = 0; i < 20; i++){
	results.utilityformatsplit.push(UtilityFormatSplit());
	results.concatenationsplit.push(ConcatenationSplit());
	results.templatesplit.push(TemplateSplit());
	results.utilityformatsplitwithconditions.push(UtilityFormatSplitWithConditions());
	results.concatenationsplitwithconditions.push(ConcatenationSplitWithConditions());
	results.templatesplitwithconditions.push(TemplateSplitWithConditions());
}
function SumArray( array ){
	var value = 0;
	for(var i = 0; i < array.length; i++){
		value += array[i];
	}
	return value;
}
function MeanArray( array ){
	return (SumArray(array) / (array.length+1));
}
console.log('UtilityFormatSplit average: ', MeanArray(results.utilityformatsplit));
console.log('ConcatenationSplit average: ', MeanArray(results.concatenationsplit));
console.log('TemplateSplit average: ', MeanArray(results.templatesplit));
console.log('UtilityFormatSplitWithConditions: ', MeanArray(results.utilityformatsplitwithconditions));
console.log('ConcatenationSplitWithConditions: ', MeanArray(results.concatenationsplitwithconditions));
console.log('TemplateSplitWithConditions: ', MeanArray(results.templatesplitwithconditions));
var output_string = JSON.stringify(results, null, '\t');
FileSystem.writeFileSync('results.json', output_string, 'utf8');
