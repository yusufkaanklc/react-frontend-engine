export const enTranslations = {
	theme: {
		error: {
			not_found: {
				title: "404 - Page Not Found",
				subtitle: "The page you are looking for does not exist. Please try another page.",
				button_text: "Go to Home",
			},
			server_error: {
				title: "500 - Server Error",
				subtitle: "The server encountered an internal error. Please try again later.",
				button_text: "Go to Home",
			},
			forbidden: {
				title: "403 - Forbidden",
				subtitle: "You do not have permission to access this page. Please try another page.",
				button_text: "Go to Home",
			},
			unauthorized: {
				title: "401 - Unauthorized",
				subtitle: "You are not authorized to access this page. Please try another page.",
				button_text: "Go to Home",
			},
		},
		sidebar: {
			collapsed_tooltip: "Sidebar collapse",
		},
		navbar: {
			theme_tooltip: "Theme change",
			search_placeholder: "Search...",
			notifications_tooltip: "Notifications",
			language_tooltip: "Language change",
			user_menu_tooltip: "User menu",
		},
		select: {
			no_select_label: "Select",
			no_option_found_label: "No content found",
		},
		dropzone: {
			drag_active_label: "You can drop the files here!",
			drag_inactive_label: "Drag and drop files or click here",
			rules_text: {
				accepted_formats: "Accepted formats: {{formats}}",
				max_size: "Maximum accepted size: {{maxSize}} MB",
				min_size: "Minimum accepted size: {{minSize}} MB",
				max_files: "Maximum number of accepted files: {{maxFiles}}",
			},
			errors: {
				file_rejected: "File rejected: {{error}}",
				too_many_file: "You can upload a maximum of {{maxFiles}} files.",
				size_too_large: "File size can be at most {{maxSize}} KB.",
			},
		},
		messages: {
			language_changed: "Language changed",
		},
	},
};
