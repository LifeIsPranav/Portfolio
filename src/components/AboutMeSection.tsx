
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

interface AboutMeItem {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  year?: string;
  link: string;
  color: string;
}

interface AboutMeSectionProps {
  title: string;
  items: AboutMeItem[];
  alignment: 'left' | 'center' | 'right';
  bgGradient: string;
  titleColor: string;
  cardBg: string;
  borderColor: string;
  titleIcon: React.ComponentType<any>;
  clipPath: string;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({
  title,
  items,
  alignment,
  bgGradient,
  titleColor,
  cardBg,
  borderColor,
  titleIcon: TitleIcon,
  clipPath
}) => {
  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start justify-start';
      case 'center':
        return 'text-center items-center justify-center';
      case 'right':
        return 'text-right items-end justify-end';
      default:
        return 'text-left items-start justify-start';
    }
  };

  return (
    <div 
      className={`absolute inset-0 ${bgGradient} flex items-center ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'}`}
      style={{ 
        clipPath,
        userSelect: 'none'
      }}
    >
      <div className={`w-full p-6 md:p-8 ${getAlignmentClasses()}`} style={{ userSelect: 'none' }}>
        <div className={`flex items-center ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'} mb-8`}>
          {alignment === 'right' ? (
            <>
              <h3 className={`text-2xl md:text-3xl font-bold ${titleColor} mr-3`}>{title}</h3>
              <TitleIcon className={`w-8 h-8 ${titleColor.replace('text-', 'text-').replace('-700', '-600').replace('-400', '-400')}`} />
            </>
          ) : (
            <>
              <TitleIcon className={`w-8 h-8 ${titleColor.replace('text-', 'text-').replace('-700', '-600').replace('-400', '-400')} mr-3`} />
              <h3 className={`text-2xl md:text-3xl font-bold ${titleColor}`}>{title}</h3>
            </>
          )}
        </div>
        
        <div className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: alignment === 'right' ? 20 : alignment === 'center' ? 0 : -20, y: alignment === 'center' ? 20 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`${cardBg} p-6 rounded-xl border ${borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              style={{ userSelect: 'none' }}
            >
              <div className="flex items-center justify-between">
                {alignment === 'right' ? (
                  <>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${item.color.replace('text-', 'text-').replace('-600', '-500')} hover:${item.color.replace('text-', 'text-').replace('-600', '-700')} transition-colors p-2 rounded-lg hover:bg-white/20`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <div className="flex items-center space-x-4">
                      <div className={`${getAlignmentClasses()} flex-1`}>
                        <h4 className={`text-lg font-bold ${item.color.replace('-600', '-800')} dark:${item.color.replace('text-', 'text-').replace('-600', '-200')} mb-1`}>{item.title}</h4>
                        <p className={`text-sm ${item.color.replace('-600', '-700')} dark:${item.color.replace('text-', 'text-').replace('-600', '-300')} mb-2`}>{item.subtitle}</p>
                        {item.year && (
                          <div className="flex items-center justify-end">
                            <span className={`text-xs ${item.color.replace('-600', '-500')} font-medium`}>{item.year}</span>
                            <Calendar className={`w-3 h-3 ml-2 ${item.color.replace('-600', '-500')}`} />
                          </div>
                        )}
                      </div>
                      <item.icon className={`w-8 h-8 ${item.color} flex-shrink-0`} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-4 flex-1">
                      <item.icon className={`w-8 h-8 ${item.color} flex-shrink-0`} />
                      <div className={getAlignmentClasses()}>
                        <h4 className={`text-lg font-bold ${item.color.replace('-600', '-800')} dark:${item.color.replace('text-', 'text-').replace('-600', '-200')} mb-1`}>{item.title}</h4>
                        <p className={`text-sm ${item.color.replace('-600', '-700')} dark:${item.color.replace('text-', 'text-').replace('-600', '-300')} mb-2`}>{item.subtitle}</p>
                        {item.year && (
                          <div className="flex items-center">
                            <Calendar className={`w-3 h-3 mr-2 ${item.color.replace('-600', '-500')}`} />
                            <span className={`text-xs ${item.color.replace('-600', '-500')} font-medium`}>{item.year}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${item.color.replace('text-', 'text-').replace('-600', '-500')} hover:${item.color.replace('text-', 'text-').replace('-600', '-700')} transition-colors p-2 rounded-lg hover:bg-white/20`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMeSection;
