/* jshint esversion: 6 */
// Copyright (c) 2020 Seán D. Murray
// SEE MIT LICENSE FILE
const crypto = require('crypto');
const is = require('prose_is');
const isit = require('prose_isit');
const array_util = require('prose_array');
const string_util = require('prose_string');

const HASH_GENERATOR = 'sha512';
const HASH_ENCODING = 'hex';

exports.copy = (obj, orderItems = false) => {
	if (isit.aPrimitive(obj)) {
		return obj;
	}

	if (isit.anArray(obj)) {
		return array_util.copy(obj, orderItems);
	}

	let result = {};
	let keys = Object.keys(obj);
	if (orderItems) {
		keys.sort();
	}
	keys.forEach((key) => {
		let value = obj[key];
		result[key] = exports.copy(value, orderItems);
	});
	return result;
};

exports.isEmpty = (obj) => {
	if (is.nil(obj)) {
		return true;
	}
	if (isit.notObject(obj)) {
		throw new Error('Tried to treat a non object as an object');
	}
	return (Object.keys(obj).length === 0) ? true : false;
};

exports.notEmpty = (obj) => {
	return exports.isEmpty(obj) ? false : true;
};

exports.equal = (obj1, obj2, orderItems = true) => {
	if (is.notDefined(obj1) && is.notDefined(obj2)) {
		return true;
	}
	if (is.allNull(obj1, obj2)) {
		return true;
	}
	let hash1 = exports.toHash(obj1, orderItems);
	let hash2 = exports.toHash(obj2, orderItems);
	return hash1 === hash2 ? true : false;
};

exports.has = (obj, key) => {
	if (isit.notObject(obj) || is.nil(key)) {
		return false;
	}
	if (is.notNil(obj[key])) {
		return true;
	}
	return false;
};

exports.notHave = (obj, key) => {
	return exports.has(obj, key) ? false : true;
};

exports.toHash = (obj, orderItems = true) => {
	if (is.nil(obj)) {
		return '0';
	}
	let deterministicCopy = exports.copy(obj, orderItems);
	let stringToHash = string_util.toString(deterministicCopy);
	return crypto.createHash(HASH_GENERATOR).update(stringToHash).digest(HASH_ENCODING);
};
