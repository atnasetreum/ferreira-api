"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLogisticDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_logistic_dto_1 = require("./create-logistic.dto");
class UpdateLogisticDto extends (0, mapped_types_1.PartialType)(create_logistic_dto_1.CreateLogisticDto) {
}
exports.UpdateLogisticDto = UpdateLogisticDto;
//# sourceMappingURL=update-logistic.dto.js.map