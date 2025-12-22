const kubekubLogo = new Proxy({"src":"/_astro/kubekub-logo.CSQfcuzl.png","width":462,"height":475,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/juanpelaez/gitkubekub/kubekub.com/src/assets/images/kubekub-logo.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/juanpelaez/gitkubekub/kubekub.com/src/assets/images/kubekub-logo.png");
							return target[name];
						}
					});

export { kubekubLogo as default };
