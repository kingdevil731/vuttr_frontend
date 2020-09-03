const converterStringParaArray = (param) => {
    return param.split(",").map((i) => i.trim());
};

export default converterStringParaArray;
