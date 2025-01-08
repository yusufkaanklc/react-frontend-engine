import { Announcement } from "@/components/Announcement";
import type { IRoot } from "@/interfaces/IRoot.ts";
import type { ICustomHandle } from "@/interfaces/plugins/ICustomRouteObject";
import { initI18n } from "@/plugins/I18N";
import { useRouterStore } from "@/stores/RouterStore.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import { promiseRejectionErrorHandler } from "@/utils/PromiseRejectionErrorHandler.ts";
import type { RouterState } from "@remix-run/router";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { type JSX, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { type RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import { pathCompare } from "./utils/PathCompare";

/**
 * Uygulamanın kök bileşeni. Temalar, dil seçenekleri ve yönlendirme gibi
 * temel yapılandırmaları içerir.
 *
 * @param {IRoot} - `routes` ve `languageTranslations` özelliklerini içeren yapılandırma nesnesi.
 * @returns {JSX.Element} - Root bileşeni.
 */
export const Root = ({ routes, configs }: IRoot): JSX.Element => {
	const setRouter = useRouterStore((state) => state.setRouter);
	const router = useRouterStore((state) => state.router);
	const initTheme = useThemeStore((state) => state.initTheme);
	const initSidebarCollapsedStatus = useUIStore((state) => state.initSidebarCollapsedStatus);

	const {
		isTooltipEnabled = true,
		isToastEnabled = true,
		isCrumbActive = true,
		pageTitlePrefix,
		translations = [],
		announcement = {
			position: "top",
			blacklist: [],
			list: [],
		},
	} = configs;

	// Uygulama başlatma işlemi
	useEffect(() => {
		const initializeLocalization = async () => {
			if (!translations || translations.length === 0) return;
			await initI18n(translations);
		};

		initializeLocalization();

		/**
		 * Uygulama başlatma işlevi. Temalar, dil yapılandırması ve yönlendirmeyi başlatır.
		 */
		const initializeApp = async () => {
			// Tema durumunu başlat
			initTheme();

			// Sidebar durumunu başlat
			initSidebarCollapsedStatus();

			// Yeni Router'ı oluştur
			const newRouter = createBrowserRouter(routes as RouteObject[], {
				future: {
					v7_relativeSplatPath: true,
					v7_fetcherPersist: true,
					v7_normalizeFormMethod: true,
					v7_skipActionErrorRevalidation: true,
				},
			});

			// Router'ı kaydet
			setRouter(newRouter);
		};

		initializeApp();
	}, [routes, setRouter, initTheme, initSidebarCollapsedStatus, translations]);

	// Sayfa başlığını güncelleme işlemi
	useEffect(() => {
		if (!router || !isCrumbActive) return;

		// Crumb verisinden aktif sayfa başlığını al
		const handlePageTitle = (routerState: RouterState) => {
			if (!routerState.matches?.length) return;

			const { pathname } = routerState.location;

			// Mevcut rotayı matches içinde bul
			const currentMatch = routerState.matches.find((match) => match.pathnameBase === pathname);

			if (!currentMatch) return;

			const handle = currentMatch.route.handle as ICustomHandle;

			// Crumb objesi ve title kontrolü
			const crumb = handle?.crumb;
			if (!crumb?.title?.trim() || !crumb?.path?.trim()) return;

			document.title = `${pageTitlePrefix} | ${crumb.title}`;
		};

		handlePageTitle(router.state);

		router.subscribe((state) => handlePageTitle(state));
	}, [router, pageTitlePrefix, translations, isCrumbActive]);

	// Promise hatalarını yönetmek için event dinleyicisi ekler ve announcement ekleme işlemlerini yönetir
	useEffect(() => {
		// Promise hatalarını yönetmek için event dinleyicisi ekler
		const handlePromiseRejections = (event: PromiseRejectionEvent) => {
			promiseRejectionErrorHandler(event);
		};

		// Promise hatalarını yönetmek için event dinleyicisi ekler
		window.addEventListener("unhandledrejection", handlePromiseRejections);
		window.addEventListener("rejectionhandled", handlePromiseRejections);

		return () => {
			window.removeEventListener("unhandledrejection", handlePromiseRejections);
			window.removeEventListener("rejectionhandled", handlePromiseRejections);
		};
	}, []);

	return (
		<ErrorBoundary fallback={<div>Bir hata oluştu</div>}>
			<div
				data-testid="announcement-container"
				className={classNames("fixed z-[9999] left-0 right-0", {
					"top-0": announcement.position === "top",
					"bottom-0": announcement.position === "bottom",
					hidden: pathCompare(announcement.blacklist || []) || announcement.list.length === 0,
				})}
			>
				{typeof announcement === "object" &&
					!isEmpty(announcement.list) &&
					announcement.list.map((announcement) => <Announcement key={announcement.id} {...announcement} />)}
			</div>
			{router ? (
				<RouterProvider future={{ v7_startTransition: true }} router={router} fallbackElement={<div>Yükleniyor...</div>} />
			) : null}
			{isToastEnabled && <ToastContainer />}
			{isTooltipEnabled && <Tooltip style={{ zIndex: 9998 }} positionStrategy="fixed" place="bottom" id="global-tooltip" />}
		</ErrorBoundary>
	);
};
