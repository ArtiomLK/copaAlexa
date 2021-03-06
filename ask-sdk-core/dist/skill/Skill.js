/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ask_sdk_model_1 = require("ask-sdk-model");
var AttributesManagerFactory_1 = require("../attributes/AttributesManagerFactory");
var DefaultRequestDispatcher_1 = require("../dispatcher/DefaultRequestDispatcher");
var ResponseFactory_1 = require("../response/ResponseFactory");
var AskSdkUtils_1 = require("../util/AskSdkUtils");
var ServiceClientFactory = ask_sdk_model_1.services.ServiceClientFactory;
/**
 * Top level container for request dispatcher.
 */
var Skill = /** @class */ (function () {
    function Skill(skillConfiguration) {
        this.persistenceAdapter = skillConfiguration.persistenceAdapter;
        this.apiClient = skillConfiguration.apiClient;
        this.customUserAgent = skillConfiguration.customUserAgent;
        this.skillId = skillConfiguration.skillId;
        this.requestDispatcher = new DefaultRequestDispatcher_1.DefaultRequestDispatcher({
            requestMappers: skillConfiguration.requestMappers,
            handlerAdapters: skillConfiguration.handlerAdapters,
            errorMapper: skillConfiguration.errorMapper,
            requestInterceptors: skillConfiguration.requestInterceptors,
            responseInterceptors: skillConfiguration.responseInterceptors,
        });
    }
    /**
     * Invokes the dispatcher to handler the request envelope and construct the handler input.
     * @param {RequestEnvelope} requestEnvelope
     * @param context
     * @returns {Promise<ResponseEnvelope>}
     */
    Skill.prototype.invoke = function (requestEnvelope, context) {
        return __awaiter(this, void 0, void 0, function () {
            var handlerInput, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.skillId != null && requestEnvelope.context.System.application.applicationId !== this.skillId) {
                            throw AskSdkUtils_1.createAskSdkError(this.constructor.name, 'Skill ID verification failed!');
                        }
                        handlerInput = {
                            requestEnvelope: requestEnvelope,
                            context: context,
                            attributesManager: AttributesManagerFactory_1.AttributesManagerFactory.init({
                                requestEnvelope: requestEnvelope,
                                persistenceAdapter: this.persistenceAdapter,
                            }),
                            responseBuilder: ResponseFactory_1.ResponseFactory.init(),
                            serviceClientFactory: this.apiClient
                                ? new ServiceClientFactory({
                                    apiClient: this.apiClient,
                                    apiEndpoint: requestEnvelope.context.System.apiEndpoint,
                                    authorizationValue: requestEnvelope.context.System.apiAccessToken,
                                })
                                : undefined,
                        };
                        return [4 /*yield*/, this.requestDispatcher.dispatch(handlerInput)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                version: '1.0',
                                response: response,
                                userAgent: AskSdkUtils_1.createAskSdkUserAgent(this.customUserAgent),
                                sessionAttributes: requestEnvelope.session ? handlerInput.attributesManager.getSessionAttributes() : undefined,
                            }];
                }
            });
        });
    };
    return Skill;
}());
exports.Skill = Skill;
//# sourceMappingURL=Skill.js.map