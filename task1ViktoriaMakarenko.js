'use strict'

function Scope(){
	this.$$watchers = [];
	this.$$asyncQueue = [];
	this.$$postDigestQueue = [];
	this.$$phase = null;
};

Scope.prototype.watch = function(watchFn, listenerFn, valueEq){
	if (watchFn){
		self = this;
		var watcher = {
				watchFn: watchFn,
				listenerFn: listenerFn || function(){},
				valueEq: !!valueEq
			};
		self.$$watchers.push(watcher);
		var index = self.$$watchers.indexOf(watcher);
		return function(){
			if(index >= 0){
				self.$$watchers.splice(index,1);
			}; 
		};
	}
};



Scope.prototype.digest = function(){
	var self = this;
	var ttl = 10;
	var changed;
	this.beginPhase('digest');
	do{
		while (this.$$asyncQueue.length) {
			try {
				this.eval(this.$$asyncQueue.shift().expression);
			} catch (err) {
				console.log(err);
			};
		};
		_.forEach(self.$$watchers, function(watch){
										try{
											changed = false;
											var newValue = watch.watchFn(self);
											var oldValue = watch.last;
											if (!self.$$areEqual(newValue, oldValue, watch.valueEq)){
												watch.listenerFn(newValue, oldValue, self);
												changed = true;
											}
											watch.last = (watch.valueEq ? _.cloneDeep(newValue) : newValue);
											ttl--;
											if (ttl === 0){
												self.clearPhase();
												throw '10 digest iterations reached';
											}
										} catch (err){
											console.log(err);
										};
										return changed;
									}
		);
	} while (changed);
	self.clearPhase();

	while (self.$$postDigestQueue.length){
		try{
			self.$$postDigestQueue.shift()();
		} catch (err){
			console.log(err);
		};
	};
};

Scope.prototype.$$postDigest = function(fn){
	this.$$postDigestQueue.push(fn);
};

Scope.prototype.eval = function(expr, parameters){
	return expr(this, parameters);
};

Scope.prototype.evalAsync = function(expr){
	var self = this;
	if (!self.$$phase && !self.$$asyncQueue.length) {
		setTimeout(function() {
			if(self.$$asyncQueue.length){
				self.digest();
			}
		}, 0);
	};
	this.$$asyncQueue.push({scope: this, expression: expr});
};

Scope.prototype.apply = function(expr){
	try {
		this.beginPhase('apply');
		return this.eval(expr);
	} finally {
		this.clearPhase();
		this.digest();
	};
};

Scope.prototype.$$areEqual = function(newValue, oldValue, valueEq){
	if (valueEq){
		return _.isEqual(newValue, oldValue);
	} else {
		return (newValue === oldValue) || ((typeof newValue === 'number') && isNaN(newValue) && (typeof(oldValue === 'number')) && isNaN(oldValue));
	};
};

Scope.prototype.beginPhase = function(phase){
	if (this.$$phase){
		throw (this.$$phase + ' already in progress.');
	};
	this.$$phase = phase;
};

Scope.prototype.clearPhase = function(){
	this.$$phase = null;
};


 