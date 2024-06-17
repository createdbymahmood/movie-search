const upperFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
/**
 * Transformer function for orval.
 *
 * @param {OpenAPIObject} inputSchema
 * @return {OpenAPIObject}
 */
module.exports = (inputSchema) => {
    return {
        ...inputSchema,
        paths: Object.entries(inputSchema.paths).reduce(
            (acc, [path, pathItem]) => ({
                ...acc,
                [path]: Object.entries(pathItem).reduce(
                    (pathItemAcc, [verb, operation]) => {
                        operation.operationId = `v1${upperFirst(
                            operation.operationId,
                        )}`

                        return {
                            ...pathItemAcc,
                            [verb]: operation,
                        }
                    },
                    {},
                ),
            }),
            {},
        ),
    }
}
