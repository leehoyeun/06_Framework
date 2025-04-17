package edu.kh.todo.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.todo.model.mapper.TodoMapper;

@Repository //DAO 계층 역할 명시 + Bean 등록
public class TodoDAO {

	//마이바티스 이용시 @Mapper 만 사용
	// @Mapper + @Repository -> 자주사용하진 않으나 가능!
	// @Repository -> 만 사용 불가능 
	
	@Autowired //의존성주입(DI) -> 같은 타입 + 상속관계 Bean을 의존성 주입(DI)
	private TodoMapper mapper; // mapper에는 TodoMapper의 구현체가 의존성 주입됨
								//그 구현체가 sqlSessionTemplate 이용

	
	
	public String testTitle() {
		//결과 저장용변수 선언
		//SQL 작성
		// Pstmt/ResultSet 등 객체 생성/ 세팅 / 사용 
		//결과값얻어온것 가공
		
		
		return mapper.testTitle();
	}
	
}
