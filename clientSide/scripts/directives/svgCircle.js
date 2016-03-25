angular
    .module('app')
    .directive('svgCircle', function() {
        return {
            restrict: 'E',
            scope: {
                size: "@",
                stroke: "@",
                fill: "@"
            },
            replace: true,
            template: '<svg ng-attr-height="{{values.canvas}}" ng-attr-width="{{values.canvas}}" class="gray">' +
            '<circle ng-attr-cx="{{values.center}}" ng-attr-cy="{{values.center}}"' +
            'ng-attr-r="{{values.radius}}" stroke="{{stroke}}"' +
            'stroke-width="3" fill="{{fill}}" />' +
            '</svg>',
            link: function(scope, element, attr) {
                var calculateValues = function(size) {
                    var canvasSize = size * 2.5;

                    scope.values = {
                        canvas: canvasSize,
                        radius: size,
                        center: canvasSize / 2
                    };
                };

                var size = parseInt(attr.size, 0);

                attr.$observe('size', function(newSize) {
                    calculateValues(parseInt(newSize, 0));
                });
            }
        };
    }
);