(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const tslib_1 = __webpack_require__(0);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = tslib_1.__decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var PostsService_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const tslib_1 = __webpack_require__(0);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(2);
const post_schema_1 = __webpack_require__(7);
const schedule_1 = __webpack_require__(3);
const operators_1 = __webpack_require__(18);
let PostsService = PostsService_1 = class PostsService {
    constructor(postModel, httpService) {
        this.postModel = postModel;
        this.httpService = httpService;
        this.logger = new common_1.Logger(PostsService_1.name);
        this.url = 'http://hn.algolia.com/api/v1/search_by_date?query=';
    }
    findAll(paginationQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let { limit, offset } = paginationQuery;
            limit = Number(limit);
            offset = Number(offset);
            return yield this.postModel
                .find({ deleted: false })
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(limit)
                .exec();
        });
    }
    findOne(postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const post = yield this.postModel.findById({ _id: postId }).exec();
            if (!post) {
                throw new common_1.NotFoundException(`Post #${postId} not found`);
            }
            return post;
        });
    }
    create(createPostDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newPost = yield new this.postModel(createPostDto);
            return newPost.save();
        });
    }
    update(postId, updatePostDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existingPost = yield this.postModel.findByIdAndUpdate({ _id: postId }, updatePostDto);
            if (!existingPost) {
                throw new common_1.NotFoundException(`Post #${postId} not found`);
            }
            return existingPost;
        });
    }
    softDelete(postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const post = yield this.postModel.findById({ _id: postId }).exec();
            return this.update(postId, {
                objectID: post.objectID,
                title: post.title,
                url: post.url,
                author: post.author,
                deleted: true,
            });
        });
    }
    remove(postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.postModel.findByIdAndRemove(postId);
        });
    }
    fetchDataFromAPI(query = 'nodejs') {
        this.logger.debug('Start collect new data');
        return this.httpService.get(`${this.url}${query}`).pipe(operators_1.map((response) => response.data.hits.filter((hit) => hit.story_title || hit.title) // discard post without title or story_title
        ));
    }
    collectDataTask() {
        this.logger.debug('Collect data from service api algolia ');
        const fromAPI = this.fetchDataFromAPI();
        fromAPI.subscribe((hits) => this.populateDataBase(hits), (error) => this.logger.error(error));
    }
    populateDataBase(hits) {
        hits.forEach((hit) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // verify if the post is in database.
            const posts = yield this.postModel
                .find({ objectID: hit.objectID })
                .exec();
            if (posts && posts.length === 0) {
                // insert new posts in database
                const post = yield this.create({
                    objectID: hit.objectID,
                    title: hit.story_title ? hit.story_title : hit.title,
                    url: hit.story_url ? hit.story_url : hit.url,
                    author: hit.author,
                    deleted: false,
                    createdAt: new Date(hit.created_at),
                });
                this.logger.debug(`Inserted post ${post}`);
            }
        }));
        this.logger.debug('End store post in database');
    }
};
tslib_1.__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_HOUR),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostsService.prototype, "collectDataTask", null);
PostsService = PostsService_1 = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_2.InjectModel(post_schema_1.Post.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof common_1.HttpService !== "undefined" && common_1.HttpService) === "function" ? _b : Object])
], PostsService);
exports.PostsService = PostsService;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = void 0;
const tslib_1 = __webpack_require__(0);
const mongoose_1 = __webpack_require__(2);
const mongoose_2 = __webpack_require__(6);
let Post = class Post extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "objectID", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "url", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "deleted", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Post.prototype, "createdAt", void 0);
Post = tslib_1.__decorate([
    mongoose_1.Schema()
], Post);
exports.Post = Post;
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
const tslib_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(9);
class CreatePostDto {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "objectID", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(300),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "url", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(50),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "author", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreatePostDto.prototype, "deleted", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreatePostDto.prototype, "createdAt", void 0);
exports.CreatePostDto = CreatePostDto;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(0);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(12);
const app_module_1 = __webpack_require__(13);
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
    });
}
bootstrap();


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(0);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(14);
const app_service_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(2);
const posts_module_1 = __webpack_require__(17);
const schedule_1 = __webpack_require__(3);
const serve_static_1 = __webpack_require__(24);
const path_1 = __webpack_require__(25);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hnfeed',
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                }),
            }),
            posts_module_1.PostsModule,
            schedule_1.ScheduleModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'client'),
                exclude: ['/api*']
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = __webpack_require__(0);
const common_1 = __webpack_require__(1);
const api_interfaces_1 = __webpack_require__(15);
const app_service_1 = __webpack_require__(4);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    common_1.Get('hello'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof api_interfaces_1.Message !== "undefined" && api_interfaces_1.Message) === "function" ? _a : Object)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    common_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _b : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(16), exports);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const tslib_1 = __webpack_require__(0);
const common_1 = __webpack_require__(1);
const posts_service_1 = __webpack_require__(5);
const posts_controller_1 = __webpack_require__(19);
const mongoose_1 = __webpack_require__(2);
const post_schema_1 = __webpack_require__(7);
const schedule_1 = __webpack_require__(3);
let PostsModule = class PostsModule {
};
PostsModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule,
            mongoose_1.MongooseModule.forFeature([{ name: post_schema_1.Post.name, schema: post_schema_1.PostSchema }]),
            schedule_1.ScheduleModule.forRoot(),
        ],
        providers: [posts_service_1.PostsService],
        controllers: [posts_controller_1.PostsController],
    })
], PostsModule);
exports.PostsModule = PostsModule;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const tslib_1 = __webpack_require__(0);
const common_1 = __webpack_require__(1);
const posts_service_1 = __webpack_require__(5);
const dto_1 = __webpack_require__(20);
const pagination_query_dto_1 = __webpack_require__(23);
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    getAllPost(res, paginationQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postsService.findAll(paginationQuery);
            return res.status(common_1.HttpStatus.OK).json(posts);
        });
    }
    getPost(res, postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const post = yield this.postsService.findOne(postId);
            if (!post) {
                throw new common_1.NotFoundException('Post does not exist!');
            }
            return res.status(common_1.HttpStatus.OK).json(post);
        });
    }
    collectData(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.postsService.collectDataTask();
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Start collect data',
            });
        });
    }
    addPost(res, createPostDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postsService.create(createPostDto);
                return res.status(common_1.HttpStatus.OK).json({
                    message: 'Post has been created successfully',
                    post: post,
                });
            }
            catch (err) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: 'Error: Post not created!',
                    status: 400,
                });
            }
        });
    }
    updatePost(res, postId, updatePostDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postsService.update(postId, updatePostDto);
                if (!post) {
                    throw new common_1.NotFoundException('Post does not exist!');
                }
                return res.status(common_1.HttpStatus.OK).json({
                    message: 'Post has been successfully updated',
                    post: post,
                });
            }
            catch (err) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: 'Error: Post not updated!',
                    status: 400,
                });
            }
        });
    }
    deletePost(res, postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!postId) {
                throw new common_1.NotFoundException('Post ID does not exist');
            }
            const post = yield this.postsService.softDelete(postId);
            if (!post) {
                throw new common_1.NotFoundException('Post does not exist');
            }
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Post has been deleted',
                post: post,
            });
        });
    }
    removePost(res, postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!postId) {
                throw new common_1.NotFoundException('Post ID does not exist');
            }
            const post = yield this.postsService.remove(postId);
            if (!post) {
                throw new common_1.NotFoundException('Post does not exist');
            }
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Post has been deleted',
                post: post,
            });
        });
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Query()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof pagination_query_dto_1.PaginationQueryDto !== "undefined" && pagination_query_dto_1.PaginationQueryDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPost", null);
tslib_1.__decorate([
    common_1.Get('/:id'),
    tslib_1.__param(0, common_1.Res()), tslib_1.__param(1, common_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
tslib_1.__decorate([
    common_1.Get('/collect/data'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PostsController.prototype, "collectData", null);
tslib_1.__decorate([
    common_1.Post(),
    tslib_1.__param(0, common_1.Res()), tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof dto_1.CreatePostDto !== "undefined" && dto_1.CreatePostDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PostsController.prototype, "addPost", null);
tslib_1.__decorate([
    common_1.Put('/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id')),
    tslib_1.__param(2, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_c = typeof dto_1.UpdatePostDto !== "undefined" && dto_1.UpdatePostDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
tslib_1.__decorate([
    common_1.Delete('/:id'),
    tslib_1.__param(0, common_1.Res()), tslib_1.__param(1, common_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
tslib_1.__decorate([
    common_1.Delete('/remove/:id'),
    tslib_1.__param(0, common_1.Res()), tslib_1.__param(1, common_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PostsController.prototype, "removePost", null);
PostsController = tslib_1.__decorate([
    common_1.Controller('posts'),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof posts_service_1.PostsService !== "undefined" && posts_service_1.PostsService) === "function" ? _d : Object])
], PostsController);
exports.PostsController = PostsController;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = void 0;
const mapped_types_1 = __webpack_require__(22);
const create_post_dto_1 = __webpack_require__(8);
class UpdatePostDto extends mapped_types_1.PartialType(create_post_dto_1.CreatePostDto) {
}
exports.UpdatePostDto = UpdatePostDto;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryDto = void 0;
const tslib_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(9);
class PaginationQueryDto {
}
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsPositive(),
    tslib_1.__metadata("design:type", Number)
], PaginationQueryDto.prototype, "limit", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsPositive(),
    tslib_1.__metadata("design:type", Number)
], PaginationQueryDto.prototype, "offset", void 0);
exports.PaginationQueryDto = PaginationQueryDto;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ])));
//# sourceMappingURL=main.js.map