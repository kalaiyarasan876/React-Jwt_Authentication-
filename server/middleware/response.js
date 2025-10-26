module.exports = (req, res, next) => {

    //200
    res.ok = (data = {}, message = 'OK', meta = {}) =>
        res.status(200).json({ success: true, message, data, meta });

    res.created = (data = {}, message = 'Created', meta = {}) =>
        res.status(201).json({ success: true, message, data, meta });

    res.accepted = (message = 'Accepted') =>
        res.status(202).json({ success: true, message });

    res.noContent = (message = 'No Content') =>
        res.status(204).json({ success: true, message });

    //400
    res.badRequest = (message = 'Bad Request', errors = []) =>
        res.status(400).json({ success: false, message, errors });

    res.unauthorized = (message = 'Unauthorized') =>
        res.status(401).json({ success: false, message });

    res.paymentRequired = (message = 'Payment Required') =>
        res.status(402).json({ success: false, message });

    res.forbidden = (message = 'Forbidden') =>
        res.status(403).json({ success: false, message });

    res.notFound = (message = 'Not Found') =>
        res.status(404).json({ success: false, message });

    res.methodNotAllowed = (message = 'Method Not Allowed') =>
        res.status(405).json({ success: false, message });

    res.notAcceptable = (message = 'Not Acceptable') =>
        res.status(406).json({ success: false, message });

    res.requestTimeout = (message = 'Request Timeout') =>
        res.status(408).json({ success: false, message });

    res.conflict = (message = 'Conflict') =>
        res.status(409).json({ success: false, message });

    res.gone = (message = 'Gone') =>
        res.status(410).json({ success: false, message });

    res.unprocessableEntity = (message = 'Unprocessable Entity') =>
        res.status(422).json({ success: false, message });

    res.tooManyRequests = (message = 'Too Many Requests') =>
        res.status(429).json({ success: false, message });

    //500
    res.internalError = (message = 'Internal Server Error') =>
        res.status(500).json({ success: false, message });

    res.notImplemented = (message = 'Not Implemented') =>
        res.status(501).json({ success: false, message });

    res.badGateway = (message = 'Bad Gateway') =>
        res.status(502).json({ success: false, message });

    res.serviceUnavailable = (message = 'Service Unavailable') =>
        res.status(503).json({ success: false, message });

    res.gatewayTimeout = (message = 'Gateway Timeout') =>
        res.status(504).json({ success: false, message });

    next();


};




// module.exports = (req, res, next) => {
//   res.ok = (data = {}, message = 'OK', meta = {}) =>
//     res.status(200).json({ success: true, message, data, meta });

//   res.created = (data = {}, message = 'Created', meta = {}) =>
//     res.status(201).json({ success: true, message, data, meta });

//   res.badRequest = (message = 'Bad Request', errors = []) =>
//     res.status(400).json({ success: false, message, errors });

//   res.unauthorized = (message = 'Unauthorized') =>
//     res.status(401).json({ success: false, message });

//   res.forbidden = (message = 'Forbidden') =>
//     res.status(403).json({ success: false, message });

//   res.notFound = (message = 'Not Found') =>
//     res.status(404).json({ success: false, message });

//   res.internalError = (message = 'Internal Server Error') =>
//     res.status(500).json({ success: false, message });

//   next();
// };
