const formatErrMsg = (errors) => errors.map((e) => `${e.path}: ${e.msg}`)

exports.formatErrMsg = formatErrMsg