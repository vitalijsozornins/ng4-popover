"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var gulpclass_1 = require("gulpclass");
var gulp = require("gulp");
var del = require("del");
var shell = require("gulp-shell");
var replace = require("gulp-replace");
var mocha = require("gulp-mocha");
var chai = require("chai");
var tslint = require("gulp-tslint");
var stylish = require("tslint-stylish");
var ts = require("gulp-typescript");
var rename = require("gulp-rename");
var file = require("gulp-file");
var uglify = require("gulp-uglify");
var packageName = require("./package.json").name;
var Gulpfile = (function () {
    function Gulpfile() {
    }
    // -------------------------------------------------------------------------
    // General tasks
    // -------------------------------------------------------------------------
    /**
     * Cleans build folder.
     */
    Gulpfile.prototype.clean = function (cb) {
        return del(["./build/**"], cb);
    };
    /**
     * Runs typescript files compilation.
     */
    Gulpfile.prototype.compile = function () {
        return gulp.src("package.json", { read: false })
            .pipe(shell([
            "\"node_modules/.bin/ngc\" -p tsconfig-aot.json"
        ]));
    };
    // -------------------------------------------------------------------------
    // Packaging and Publishing tasks
    // -------------------------------------------------------------------------
    /**
     * Compiles and compiles bundles.
     */
    Gulpfile.prototype.compileBundles = function () {
        var amdTsProject = ts.createProject("tsconfig.json", {
            module: "amd",
            outFile: packageName + ".amd.js",
            typescript: require("typescript")
        });
        var systemTsProject = ts.createProject("tsconfig.json", {
            module: "system",
            outFile: packageName + ".system.js",
            typescript: require("typescript")
        });
        var amdPureTsProject = ts.createProject("tsconfig.json", {
            module: "amd",
            outFile: packageName + ".pure.amd.js",
            noEmitHelpers: true,
            noImplicitUseStrict: true,
            typescript: require("typescript")
        });
        var systemPureTsProject = ts.createProject("tsconfig.json", {
            module: "system",
            outFile: packageName + ".pure.system.js",
            noEmitHelpers: true,
            noImplicitUseStrict: true,
            typescript: require("typescript")
        });
        return [
            gulp.src("build/bundle/**/*.ts")
                .pipe(amdTsProject()).js
                .pipe(gulp.dest("build/package")),
            gulp.src("build/bundle/**/*.ts")
                .pipe(systemTsProject()).js
                .pipe(gulp.dest("build/package")),
            gulp.src("build/bundle/**/*.ts")
                .pipe(amdPureTsProject()).js
                .pipe(gulp.dest("build/package")),
            gulp.src("build/bundle/**/*.ts")
                .pipe(systemPureTsProject()).js
                .pipe(gulp.dest("build/package"))
        ];
    };
    /**
     * Copies all source files into destination folder in a correct structure to build bundles.
     */
    Gulpfile.prototype.bundleCopySources = function () {
        return gulp.src(["./src/**/*.ts"])
            .pipe(gulp.dest("./build/bundle/" + packageName));
    };
    /**
     * Creates special main file for bundle build.
     */
    Gulpfile.prototype.bundleCopyMainFile = function () {
        return gulp.src("./package.json", { read: false })
            .pipe(file(packageName + ".ts", "export * from \"./" + packageName + "/index\";"))
            .pipe(gulp.dest("./build/bundle"));
    };
    /**
     * Uglifys bundles.
     */
    Gulpfile.prototype.uglify = function () {
        return [
            gulp.src("./build/package/" + packageName + ".pure.amd.js")
                .pipe(uglify())
                .pipe(rename(packageName + ".pure.amd.min.js"))
                .pipe(gulp.dest("./build/package")),
            gulp.src("./build/package/" + packageName + ".pure.system.js")
                .pipe(uglify())
                .pipe(rename(packageName + ".pure.system.min.js"))
                .pipe(gulp.dest("./build/package")),
            gulp.src("./build/package/" + packageName + ".amd.js")
                .pipe(uglify())
                .pipe(rename(packageName + ".amd.min.js"))
                .pipe(gulp.dest("./build/package")),
            gulp.src("./build/package/" + packageName + ".system.js")
                .pipe(uglify())
                .pipe(rename(packageName + ".system.min.js"))
                .pipe(gulp.dest("./build/package")),
        ];
    };
    /**
     * Publishes a package to npm from ./build/package directory.
     */
    Gulpfile.prototype.npmPublish = function () {
        return gulp.src("package.json", { read: false })
            .pipe(shell([
            "cd ./build/package && npm publish"
        ]));
    };
    /**
     * Change the "private" state of the packaged package.json file to public.
     */
    Gulpfile.prototype.packagePreparePackageFile = function () {
        return gulp.src("./package.json")
            .pipe(replace("\"private\": true,", "\"private\": false,"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * This task will replace all typescript code blocks in the README (since npm does not support typescript syntax
     * highlighting) and copy this README file into the package folder.
     */
    Gulpfile.prototype.packageReadmeFile = function () {
        return gulp.src("./README.md")
            .pipe(replace(/```typescript([\s\S]*?)```/g, "```javascript$1```"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Creates a package that can be published to npm.
     */
    Gulpfile.prototype.package = function () {
        return [
            "clean",
            ["bundleCopySources", "bundleCopyMainFile"],
            ["compile", "compileBundles"],
            ["uglify"],
            ["packagePreparePackageFile", "packageReadmeFile"]
        ];
    };
    /**
     * Creates a package and publishes it to npm.
     */
    Gulpfile.prototype.publish = function () {
        return ["package", "npmPublish"];
    };
    // -------------------------------------------------------------------------
    // Run tests tasks
    // -------------------------------------------------------------------------
    /**
     * Runs ts linting to validate source code.
     */
    Gulpfile.prototype.tslint = function () {
        return gulp.src(["./src/**/*.ts", "./test/**/*.ts", "./sample/**/*.ts"])
            .pipe(tslint())
            .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
    };
    /**
     * Runs unit-tests.
     */
    Gulpfile.prototype.unit = function () {
        chai.should();
        chai.use(require("sinon-chai"));
        return gulp.src("./build/es5/test/unit/**/*.js")
            .pipe(mocha());
    };
    /**
     * Compiles the code and runs tests.
     */
    Gulpfile.prototype.tests = function () {
        return ["clean", "compile", "tslint", "unit"];
    };
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "clean");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "compile");
    __decorate([
        gulpclass_1.MergedTask()
    ], Gulpfile.prototype, "compileBundles");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "bundleCopySources");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "bundleCopyMainFile");
    __decorate([
        gulpclass_1.MergedTask()
    ], Gulpfile.prototype, "uglify");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "npmPublish");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "packagePreparePackageFile");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "packageReadmeFile");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "package");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "publish");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "tslint");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "unit");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "tests");
    Gulpfile = __decorate([
        gulpclass_1.Gulpclass()
    ], Gulpfile);
    return Gulpfile;
}());
exports.Gulpfile = Gulpfile;
