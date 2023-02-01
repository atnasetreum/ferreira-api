"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellersController = void 0;
const common_1 = require("@nestjs/common");
const sellers_service_1 = require("./sellers.service");
const dto_1 = require("./dto");
const guards_1 = require("../auth/guards");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
let SellersController = class SellersController {
    constructor(sellersService) {
        this.sellersService = sellersService;
    }
    create(createSellerDto, images) {
        return this.sellersService.create(createSellerDto, images).catch((err) => {
            images.forEach((image) => {
                (0, fs_1.unlinkSync)(image.path);
            });
            throw new common_1.BadRequestException(err === null || err === void 0 ? void 0 : err.message);
        });
    }
    findAll(query) {
        return this.sellersService.findAll(query);
    }
    findAllNoParent() {
        return this.sellersService.findAllNoParent();
    }
    findAllBasic() {
        return this.sellersService.findAllBasic();
    }
    findOne(id) {
        return this.sellersService.findOne(+id);
    }
    update(id, updateSellerDto, images) {
        return this.sellersService.update(+id, updateSellerDto, images);
    }
    remove(id) {
        return this.sellersService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: './public/static/images/sellers',
            filename(req, file, callback) {
                const fileExtension = file.mimetype.split('/')[1];
                let fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
                if (file.fieldname.startsWith('ref')) {
                    fileName = 'REF-' + fileName;
                }
                callback(null, fileName);
            },
        }),
        limits: {
            fileSize: 2097152,
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSellerDto,
        Array]),
    __metadata("design:returntype", void 0)
], SellersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QuerySellerDto]),
    __metadata("design:returntype", void 0)
], SellersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('no-parent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SellersController.prototype, "findAllNoParent", null);
__decorate([
    (0, common_1.Get)('basic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SellersController.prototype, "findAllBasic", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: './public/static/images/sellers',
            filename(req, file, callback) {
                const fileExtension = file.mimetype.split('/')[1];
                let fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
                if (file.fieldname.startsWith('ref')) {
                    fileName = 'REF-' + fileName;
                }
                callback(null, fileName);
            },
        }),
        limits: {
            fileSize: 2097152,
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSellerDto,
        Array]),
    __metadata("design:returntype", void 0)
], SellersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellersController.prototype, "remove", null);
SellersController = __decorate([
    (0, common_1.Controller)('sellers'),
    (0, common_1.UseGuards)(guards_1.JwtValidateGuard),
    __metadata("design:paramtypes", [sellers_service_1.SellersService])
], SellersController);
exports.SellersController = SellersController;
//# sourceMappingURL=sellers.controller.js.map