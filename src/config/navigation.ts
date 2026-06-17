import type { LucideIcon } from 'lucide-react'
import {
	BookOpen,
	Settings,
	Skull,
	ScrollText,
	Download,
	Images,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'guide' -> t('nav.guide')
	path: string // URL 路径，如 '/guide'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// COBB CAN MOVE 导航分类（与 content/{locale}/ 下的目录一一对应）
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'mechanics', path: '/mechanics', icon: Settings, isContentType: true },
	{ key: 'ending', path: '/ending', icon: Skull, isContentType: true },
	{ key: 'lore', path: '/lore', icon: ScrollText, isContentType: true },
	{ key: 'download', path: '/download', icon: Download, isContentType: true },
	{ key: 'media', path: '/media', icon: Images, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['guide', 'mechanics', 'ending', 'lore', 'download', 'media']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
